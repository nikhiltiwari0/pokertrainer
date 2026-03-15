import { Card } from '@/types';
import { Position, POSITION_ORDER } from '@/types/scenario';
import { SimGameState, SimPlayer, SimAction, BettingAction, AvailableAction, SimStreet, ShowdownResult } from '@/types/simulation';
import { createDeck, shuffle } from './deck';
import { evaluateHand } from './boardEvaluator';
import { getHandScore, compareScores } from './handRankingDrillChecker';
import { MadeHandType } from '@/types/handRecognition';

const STARTING_STACK = 200;
const SB_AMOUNT = 1;
const BB_AMOUNT = 2;
const NUM_PLAYERS = 6;

// Preflop order: UTG, HJ, CO, BTN, SB, BB
// Postflop order: SB, BB, UTG, HJ, CO, BTN
const PREFLOP_POSITION_ORDER: Position[] = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];
const POSTFLOP_POSITION_ORDER: Position[] = ['SB', 'BB', 'UTG', 'HJ', 'CO', 'BTN'];

function getPositionForSeat(seatIndex: number, dealerSeatIndex: number): Position {
  // Seat to the left of the dealer is SB, then BB, then UTG, etc.
  // Dealer seat = BTN
  const offset = (seatIndex - dealerSeatIndex + NUM_PLAYERS) % NUM_PLAYERS;
  // offset 0 = BTN, 1 = SB, 2 = BB, 3 = UTG, 4 = HJ, 5 = CO
  const posMap: Position[] = ['BTN', 'SB', 'BB', 'UTG', 'HJ', 'CO'];
  return posMap[offset];
}

export function createInitialGameState(handNumber: number, dealerSeatIndex: number, heroSeat: number = 0): SimGameState {
  const deck = shuffle(createDeck());

  const players: SimPlayer[] = [];
  for (let i = 0; i < NUM_PLAYERS; i++) {
    players.push({
      id: i,
      position: getPositionForSeat(i, dealerSeatIndex),
      holeCards: [deck[i * 2], deck[i * 2 + 1]] as [Card, Card],
      stack: STARTING_STACK,
      isHero: i === heroSeat,
      isFolded: false,
      isAllIn: false,
      totalInvested: 0,
      currentBet: 0,
    });
  }

  // Post blinds
  const sbPlayer = players.find(p => p.position === 'SB')!;
  const bbPlayer = players.find(p => p.position === 'BB')!;

  sbPlayer.stack -= SB_AMOUNT;
  sbPlayer.currentBet = SB_AMOUNT;
  sbPlayer.totalInvested = SB_AMOUNT;

  bbPlayer.stack -= BB_AMOUNT;
  bbPlayer.currentBet = BB_AMOUNT;
  bbPlayer.totalInvested = BB_AMOUNT;

  const pot = SB_AMOUNT + BB_AMOUNT;

  // Find first player to act preflop (UTG)
  const utgPlayer = players.find(p => p.position === 'UTG')!;

  return {
    phase: 'preflop',
    handNumber,
    dealerSeatIndex,
    deck,
    players,
    communityCards: [],
    pot,
    currentStreet: 'preflop',
    currentPlayerIndex: utgPlayer.id,
    highestBet: BB_AMOUNT,
    minRaise: BB_AMOUNT,
    lastRaiserIndex: bbPlayer.id,
    actedThisRound: [],
    actionHistory: [],
    heroDecisionPoints: [],
    deckIndex: NUM_PLAYERS * 2, // cards dealt so far
  };
}

export function getActivePlayerCount(state: SimGameState): number {
  return state.players.filter(p => !p.isFolded).length;
}

function getActionOrder(street: SimStreet): Position[] {
  return street === 'preflop' ? PREFLOP_POSITION_ORDER : POSTFLOP_POSITION_ORDER;
}

export function getNextActivePlayer(state: SimGameState): number | null {
  const order = getActionOrder(state.currentStreet);
  const activePlayers = state.players.filter(p => !p.isFolded && !p.isAllIn);

  if (activePlayers.length <= 1) return null;

  // Find the current player's position in the action order
  const currentPos = state.players[state.currentPlayerIndex].position;
  const currentOrderIdx = order.indexOf(currentPos);

  // Go around the table looking for the next player who hasn't completed their action
  for (let offset = 1; offset <= NUM_PLAYERS; offset++) {
    const nextOrderIdx = (currentOrderIdx + offset) % order.length;
    const nextPos = order[nextOrderIdx];
    const nextPlayer = activePlayers.find(p => p.position === nextPos);

    if (nextPlayer) {
      // Check if this player still needs to act
      const hasActed = state.actedThisRound.includes(nextPlayer.id);

      if (!hasActed || nextPlayer.currentBet < state.highestBet) {
        return nextPlayer.id;
      }
    }
  }

  return null;
}

export function getAvailableActions(state: SimGameState): AvailableAction[] {
  const player = state.players[state.currentPlayerIndex];
  if (!player || player.isFolded || player.isAllIn) return [];

  const amountToCall = state.highestBet - player.currentBet;
  const actions: AvailableAction[] = [];

  if (amountToCall > 0) {
    // Facing a bet/raise
    actions.push({ action: 'fold' });
    actions.push({ action: 'call', minAmount: Math.min(amountToCall, player.stack) });
    if (player.stack > amountToCall) {
      const minRaiseTotal = state.highestBet + state.minRaise;
      const minRaiseAmount = minRaiseTotal - player.currentBet;
      actions.push({
        action: 'raise',
        minAmount: Math.min(minRaiseAmount, player.stack),
        maxAmount: player.stack,
      });
    }
  } else {
    // No bet to face
    actions.push({ action: 'check' });
    if (player.stack > 0) {
      actions.push({
        action: 'bet',
        minAmount: BB_AMOUNT,
        maxAmount: player.stack,
      });
    }
  }

  return actions;
}

export function processAction(
  state: SimGameState,
  action: SimAction,
  amount: number,
): SimGameState {
  const newState = deepCloneState(state);
  const player = newState.players[newState.currentPlayerIndex];

  const bettingAction: BettingAction = {
    playerId: player.id,
    position: player.position,
    action,
    amount: 0,
    isHero: player.isHero,
    street: newState.currentStreet,
    potAfter: newState.pot,
  };

  switch (action) {
    case 'fold':
      player.isFolded = true;
      break;

    case 'check':
      // No chips moved
      break;

    case 'call': {
      const callAmount = Math.min(newState.highestBet - player.currentBet, player.stack);
      player.stack -= callAmount;
      player.currentBet += callAmount;
      player.totalInvested += callAmount;
      newState.pot += callAmount;
      bettingAction.amount = callAmount;
      if (player.stack === 0) player.isAllIn = true;
      break;
    }

    case 'bet': {
      const betAmount = Math.min(amount, player.stack);
      player.stack -= betAmount;
      player.currentBet += betAmount;
      player.totalInvested += betAmount;
      newState.pot += betAmount;
      newState.highestBet = player.currentBet;
      newState.minRaise = betAmount;
      newState.lastRaiserIndex = player.id;
      bettingAction.amount = betAmount;
      if (player.stack === 0) player.isAllIn = true;
      break;
    }

    case 'raise': {
      const raiseTotal = Math.min(amount, player.stack);
      const extraChips = raiseTotal; // amount beyond current bet handled by caller
      const totalBet = player.currentBet + raiseTotal;
      const raiseDiff = totalBet - newState.highestBet;

      player.stack -= raiseTotal;
      player.currentBet += raiseTotal;
      player.totalInvested += raiseTotal;
      newState.pot += raiseTotal;
      if (raiseDiff > 0) {
        newState.minRaise = raiseDiff;
      }
      newState.highestBet = player.currentBet;
      newState.lastRaiserIndex = player.id;
      bettingAction.amount = raiseTotal;
      if (player.stack === 0) player.isAllIn = true;
      break;
    }
  }

  bettingAction.potAfter = newState.pot;
  newState.actionHistory.push(bettingAction);

  if (!newState.actedThisRound.includes(player.id)) {
    newState.actedThisRound.push(player.id);
  }

  return newState;
}

export function isBettingRoundComplete(state: SimGameState): boolean {
  const activePlayers = state.players.filter(p => !p.isFolded && !p.isAllIn);

  // Only one player left (everyone else folded)
  if (activePlayers.length <= 1) return true;

  // All active players must have acted and have equal bets
  for (const p of activePlayers) {
    if (!state.actedThisRound.includes(p.id)) return false;
    if (p.currentBet < state.highestBet) return false;
  }

  return true;
}

export function isHandOver(state: SimGameState): boolean {
  const activePlayers = state.players.filter(p => !p.isFolded);
  if (activePlayers.length <= 1) return true;

  // All remaining players are all-in
  const playersWhoCanAct = activePlayers.filter(p => !p.isAllIn);
  if (playersWhoCanAct.length <= 1 && state.currentStreet !== 'preflop') {
    return isBettingRoundComplete(state);
  }

  return false;
}

export function advanceStreet(state: SimGameState): SimGameState {
  const newState = deepCloneState(state);

  // Reset per-round state
  for (const p of newState.players) {
    p.currentBet = 0;
  }
  newState.highestBet = 0;
  newState.actedThisRound = [];
  newState.lastRaiserIndex = -1;
  newState.minRaise = BB_AMOUNT;

  // Deal community cards and advance street
  switch (newState.currentStreet) {
    case 'preflop': {
      // Deal flop (3 cards)
      const flop = newState.deck.slice(newState.deckIndex, newState.deckIndex + 3);
      newState.communityCards = flop;
      newState.deckIndex += 3;
      newState.currentStreet = 'flop';
      newState.phase = 'flop';
      break;
    }
    case 'flop': {
      const turn = newState.deck[newState.deckIndex];
      newState.communityCards.push(turn);
      newState.deckIndex += 1;
      newState.currentStreet = 'turn';
      newState.phase = 'turn';
      break;
    }
    case 'turn': {
      const river = newState.deck[newState.deckIndex];
      newState.communityCards.push(river);
      newState.deckIndex += 1;
      newState.currentStreet = 'river';
      newState.phase = 'river';
      break;
    }
    case 'river': {
      // Hand is over, go to showdown
      newState.phase = 'showdown';
      return newState;
    }
  }

  // Find first active player postflop (SB or next)
  const postflopOrder = POSTFLOP_POSITION_ORDER;
  for (const pos of postflopOrder) {
    const player = newState.players.find(p => p.position === pos && !p.isFolded && !p.isAllIn);
    if (player) {
      newState.currentPlayerIndex = player.id;
      break;
    }
  }

  return newState;
}

export function resolveShowdown(state: SimGameState): ShowdownResult {
  const activePlayers = state.players.filter(p => !p.isFolded);

  // If only one player remains (everyone else folded)
  if (activePlayers.length === 1) {
    const winner = activePlayers[0];
    return {
      winners: [winner.id],
      winnerPositions: [winner.position],
      potAwarded: state.pot,
      playerHands: state.players.map(p => ({
        playerId: p.id,
        position: p.position,
        holeCards: p.holeCards,
        handType: p.isFolded ? 'high-card' as MadeHandType : evaluateHand(p.holeCards, state.communityCards),
        isFolded: p.isFolded,
      })),
      heroSurvived: !state.players.find(p => p.isHero)!.isFolded,
    };
  }

  // Evaluate all active hands
  const handResults = activePlayers.map(p => ({
    player: p,
    score: getHandScore(p.holeCards, state.communityCards),
    handType: evaluateHand(p.holeCards, state.communityCards),
  }));

  // Find the best score
  let bestScore = handResults[0].score;
  for (let i = 1; i < handResults.length; i++) {
    if (compareScores(handResults[i].score, bestScore) > 0) {
      bestScore = handResults[i].score;
    }
  }

  // Find all winners (ties possible)
  const winners = handResults.filter(r => compareScores(r.score, bestScore) === 0);

  return {
    winners: winners.map(w => w.player.id),
    winnerPositions: winners.map(w => w.player.position),
    potAwarded: state.pot,
    playerHands: state.players.map(p => ({
      playerId: p.id,
      position: p.position,
      holeCards: p.holeCards,
      handType: p.isFolded ? 'high-card' as MadeHandType : evaluateHand(p.holeCards, state.communityCards),
      isFolded: p.isFolded,
    })),
    heroSurvived: !state.players.find(p => p.isHero)!.isFolded,
  };
}

function deepCloneState(state: SimGameState): SimGameState {
  return {
    ...state,
    players: state.players.map(p => ({ ...p })),
    communityCards: [...state.communityCards],
    actionHistory: [...state.actionHistory],
    heroDecisionPoints: [...state.heroDecisionPoints],
    actedThisRound: [...state.actedThisRound],
    deck: state.deck, // deck doesn't mutate
  };
}
