'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { SimGameState, SimAction, HandReview, DecisionPoint, ShowdownResult, AvailableAction } from '@/types/simulation';
import { evaluateHand } from '@/engine/boardEvaluator';
import { createInitialGameState, getAvailableActions, processAction, isBettingRoundComplete, isHandOver, advanceStreet, resolveShowdown, getNextActivePlayer, getActivePlayerCount } from '@/engine/simBettingRound';
import { aiDecision } from '@/engine/simAI';
import { generateHandReview } from '@/engine/simReview';

const AI_ACTION_DELAY = 500;

export function useSimulation() {
  const [gameState, setGameState] = useState<SimGameState | null>(null);
  const [review, setReview] = useState<HandReview | null>(null);
  const [handCount, setHandCount] = useState(0);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [showdownResult, setShowdownResult] = useState<ShowdownResult | null>(null);
  const aiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef<SimGameState | null>(null);

  // Keep ref in sync
  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (aiTimerRef.current) clearTimeout(aiTimerRef.current);
    };
  }, []);

  const finishHand = useCallback((state: SimGameState) => {
    // Deal remaining community cards if needed for showdown display
    let finalState = { ...state };
    const activePlayers = finalState.players.filter(p => !p.isFolded);

    if (activePlayers.length > 1) {
      // Deal remaining community cards
      while (finalState.communityCards.length < 5) {
        const card = finalState.deck[finalState.deckIndex];
        finalState = {
          ...finalState,
          communityCards: [...finalState.communityCards, card],
          deckIndex: finalState.deckIndex + 1,
        };
      }
    }

    const result = resolveShowdown(finalState);
    setShowdownResult(result);

    const reviewData = generateHandReview(
      finalState.heroDecisionPoints,
      result,
      finalState.handNumber,
    );

    setReview(reviewData);
    setGameState({ ...finalState, phase: 'showdown', communityCards: finalState.communityCards });
  }, []);

  const processAITurns = useCallback((state: SimGameState) => {
    const currentPlayer = state.players[state.currentPlayerIndex];

    // Check if hand is over
    if (getActivePlayerCount(state) <= 1 || isHandOver(state)) {
      if (isBettingRoundComplete(state)) {
        if (state.currentStreet === 'river' || getActivePlayerCount(state) <= 1) {
          finishHand(state);
          return;
        }
        const advanced = advanceStreet(state);
        setGameState(advanced);
        // Continue processing from the new street
        setIsAIThinking(false);
        // Check if hero acts first on new street
        const nextPlayer = advanced.players[advanced.currentPlayerIndex];
        if (nextPlayer.isHero) {
          return;
        }
        setIsAIThinking(true);
        aiTimerRef.current = setTimeout(() => processAITurns(advanced), AI_ACTION_DELAY);
        return;
      }
    }

    // Check if betting round is complete
    if (isBettingRoundComplete(state)) {
      if (state.currentStreet === 'river') {
        finishHand(state);
        return;
      }
      const advanced = advanceStreet(state);
      setGameState(advanced);
      const nextPlayer = advanced.players[advanced.currentPlayerIndex];
      if (nextPlayer.isHero && !nextPlayer.isFolded) {
        setIsAIThinking(false);
        return;
      }
      setIsAIThinking(true);
      aiTimerRef.current = setTimeout(() => processAITurns(advanced), AI_ACTION_DELAY);
      return;
    }

    // If it's hero's turn, stop and wait
    if (currentPlayer.isHero && !currentPlayer.isFolded) {
      setIsAIThinking(false);
      return;
    }

    // AI turn
    if (!currentPlayer.isFolded && !currentPlayer.isAllIn) {
      const decision = aiDecision(currentPlayer, state);
      let newState = processAction(state, decision.action, decision.amount);

      // Move to next player
      const nextId = getNextActivePlayer(newState);
      if (nextId !== null) {
        newState = { ...newState, currentPlayerIndex: nextId };
      }

      setGameState(newState);

      // Schedule next AI action
      aiTimerRef.current = setTimeout(() => processAITurns(newState), AI_ACTION_DELAY);
    } else {
      // Skip folded/all-in players
      const nextId = getNextActivePlayer(state);
      if (nextId !== null) {
        const newState = { ...state, currentPlayerIndex: nextId };
        setGameState(newState);
        aiTimerRef.current = setTimeout(() => processAITurns(newState), AI_ACTION_DELAY);
      } else {
        // No more players to act
        if (state.currentStreet === 'river') {
          finishHand(state);
        } else {
          const advanced = advanceStreet(state);
          setGameState(advanced);
          aiTimerRef.current = setTimeout(() => processAITurns(advanced), AI_ACTION_DELAY);
        }
      }
    }
  }, [finishHand]);

  const startHand = useCallback(() => {
    if (aiTimerRef.current) clearTimeout(aiTimerRef.current);

    const dealerSeat = handCount % 6;
    const state = createInitialGameState(handCount + 1, dealerSeat);

    setGameState(state);
    setReview(null);
    setShowdownResult(null);
    setHandCount(prev => prev + 1);

    // Process AI actions until hero's turn
    const heroPlayer = state.players.find(p => p.isHero)!;
    const currentPlayer = state.players[state.currentPlayerIndex];

    if (!currentPlayer.isHero) {
      setIsAIThinking(true);
      aiTimerRef.current = setTimeout(() => processAITurns(state), AI_ACTION_DELAY);
    }
  }, [handCount, processAITurns]);

  const submitHeroAction = useCallback((action: SimAction, amount: number = 0) => {
    if (!gameState) return;
    const player = gameState.players[gameState.currentPlayerIndex];
    if (!player.isHero) return;

    // Record decision point
    const decisionPoint: DecisionPoint = {
      street: gameState.currentStreet,
      position: player.position,
      holeCards: player.holeCards,
      communityCards: [...gameState.communityCards],
      pot: gameState.pot,
      heroStack: player.stack,
      amountToCall: gameState.highestBet - player.currentBet,
      actionsBefore: [...gameState.actionHistory],
      heroAction: action,
      heroAmount: amount,
      recommendedAction: action, // filled in during review
      recommendedAmount: 0,
      isCorrect: true, // filled in during review
      explanation: '',
      handStrength: gameState.communityCards.length >= 3
        ? evaluateHand(player.holeCards, gameState.communityCards)
        : undefined,
    };

    // Process the action
    let newState = processAction(gameState, action, amount);
    newState = {
      ...newState,
      heroDecisionPoints: [...newState.heroDecisionPoints, decisionPoint],
    };

    // Check if hand is over after hero's action
    if (action === 'fold' || getActivePlayerCount(newState) <= 1) {
      setGameState(newState);
      finishHand(newState);
      return;
    }

    // Move to next player
    const nextId = getNextActivePlayer(newState);
    if (nextId !== null) {
      newState = { ...newState, currentPlayerIndex: nextId };
      setGameState(newState);

      // Check if betting round is complete
      if (isBettingRoundComplete(newState)) {
        if (newState.currentStreet === 'river') {
          finishHand(newState);
          return;
        }
        const advanced = advanceStreet(newState);
        setGameState(advanced);
        const nextPlayer = advanced.players[advanced.currentPlayerIndex];
        if (!nextPlayer.isHero || nextPlayer.isFolded) {
          setIsAIThinking(true);
          aiTimerRef.current = setTimeout(() => processAITurns(advanced), AI_ACTION_DELAY);
        }
        return;
      }

      // Continue with AI
      const nextPlayer = newState.players[newState.currentPlayerIndex];
      if (!nextPlayer.isHero) {
        setIsAIThinking(true);
        aiTimerRef.current = setTimeout(() => processAITurns(newState), AI_ACTION_DELAY);
      }
    } else {
      // No next player — round complete
      if (isBettingRoundComplete(newState)) {
        if (newState.currentStreet === 'river') {
          finishHand(newState);
          return;
        }
        const advanced = advanceStreet(newState);
        setGameState(advanced);
        const nextPlayer = advanced.players[advanced.currentPlayerIndex];
        if (!nextPlayer.isHero || nextPlayer.isFolded) {
          setIsAIThinking(true);
          aiTimerRef.current = setTimeout(() => processAITurns(advanced), AI_ACTION_DELAY);
        }
      }
    }
  }, [gameState, processAITurns, finishHand]);

  const heroActions: AvailableAction[] = gameState && !isAIThinking
    ? getAvailableActions(gameState)
    : [];

  const goToReview = useCallback(() => {
    if (gameState) {
      setGameState({ ...gameState, phase: 'review' });
    }
  }, [gameState]);

  return {
    gameState,
    review,
    heroActions,
    submitHeroAction,
    startHand,
    handCount,
    isAIThinking,
    showdownResult,
    goToReview,
  };
}
