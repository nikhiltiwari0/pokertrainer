import { SimGameState, SimAction, BettingAction } from '@/types/simulation';
import { SimPlayer } from '@/types/simulation';
import { toHandNotation } from './handEvaluator';
import { isRFI } from '@/data/ranges/rfi';
import { getActionFacingRaise } from '@/data/ranges/facingRaise';
import { getActionFacingThreeBet } from '@/data/ranges/facingThreeBet';
import { categorizePostflopHand } from './simHandStrength';

const BB = 2;

export function aiDecision(
  player: SimPlayer,
  state: SimGameState,
): { action: SimAction; amount: number } {
  if (state.currentStreet === 'preflop') {
    return aiPreflopDecision(player, state);
  }
  return aiPostflopDecision(player, state);
}

function aiPreflopDecision(
  player: SimPlayer,
  state: SimGameState,
): { action: SimAction; amount: number } {
  const hand = toHandNotation(player.holeCards[0], player.holeCards[1]);
  const amountToCall = state.highestBet - player.currentBet;

  // Find what happened before this player
  const streetActions = state.actionHistory.filter(a => a.street === 'preflop');

  // Find if there was a raise (beyond the BB)
  const raises = streetActions.filter(a => a.action === 'raise' || a.action === 'bet');
  const hasRaise = raises.length > 0;
  const has3Bet = raises.length >= 2;

  if (!hasRaise) {
    // RFI spot — no raise yet
    if (isRFI(hand, player.position)) {
      const raiseAmount = Math.round(BB * 2.5);
      return { action: 'raise', amount: raiseAmount };
    }
    // BB can check if no raise
    if (amountToCall === 0) {
      return { action: 'check', amount: 0 };
    }
    return { action: 'fold', amount: 0 };
  }

  if (hasRaise && !has3Bet) {
    // Facing a single raise
    const raiser = raises[0];
    const raiserPos = raiser.position;
    const result = getActionFacingRaise(hand, player.position, raiserPos);
    if (result === 'raise') {
      const raiseAmount = Math.round(raiser.amount * 3);
      return { action: 'raise', amount: Math.min(raiseAmount, player.stack) };
    }
    if (result === 'call') {
      return { action: 'call', amount: amountToCall };
    }
    return { action: 'fold', amount: 0 };
  }

  if (has3Bet) {
    // Facing a 3-bet (or higher)
    // If this player was the original raiser, use facing3bet ranges
    const originalRaiser = raises[0];
    if (originalRaiser.playerId === player.id) {
      const threeBettor = raises[1];
      const result = getActionFacingThreeBet(hand, player.position, threeBettor.position);
      if (result === 'raise') {
        const raiseAmount = Math.round(threeBettor.amount * 2.5);
        return { action: 'raise', amount: Math.min(raiseAmount, player.stack) };
      }
      if (result === 'call') {
        return { action: 'call', amount: amountToCall };
      }
      return { action: 'fold', amount: 0 };
    }

    // Squeezed / cold 4-bet spot — only continue with premium
    const premiums = new Set(['AA', 'KK', 'QQ', 'AKs']);
    if (premiums.has(hand)) {
      return { action: 'call', amount: amountToCall };
    }
    return { action: 'fold', amount: 0 };
  }

  // Default
  if (amountToCall === 0) return { action: 'check', amount: 0 };
  return { action: 'fold', amount: 0 };
}

function aiPostflopDecision(
  player: SimPlayer,
  state: SimGameState,
): { action: SimAction; amount: number } {
  const category = categorizePostflopHand(player.holeCards, state.communityCards);
  const amountToCall = state.highestBet - player.currentBet;
  const facingBet = amountToCall > 0;
  const pot = state.pot;

  // Is this player in position relative to remaining opponents?
  const activePlayers = state.players.filter(p => !p.isFolded && !p.isAllIn);
  const playerIdx = activePlayers.findIndex(p => p.id === player.id);
  const isLast = playerIdx === activePlayers.length - 1;

  if (facingBet) {
    return aiPostflopFacingBet(category, amountToCall, pot, player.stack, isLast);
  }
  return aiPostflopCheckedTo(category, pot, player.stack, isLast);
}

function aiPostflopCheckedTo(
  category: ReturnType<typeof categorizePostflopHand>,
  pot: number,
  stack: number,
  isLast: boolean,
): { action: SimAction; amount: number } {
  const halfPot = Math.round(pot * 0.5);
  const twothirdsPot = Math.round(pot * 0.66);

  switch (category) {
    case 'monster':
      // Bet for value, sometimes check to trap
      if (Math.random() < 0.15) return { action: 'check', amount: 0 };
      return { action: 'bet', amount: Math.min(twothirdsPot, stack) };

    case 'strong':
      return { action: 'bet', amount: Math.min(halfPot, stack) };

    case 'medium':
      // Usually check for pot control
      if (isLast && Math.random() < 0.25) {
        return { action: 'bet', amount: Math.min(Math.round(pot * 0.33), stack) };
      }
      return { action: 'check', amount: 0 };

    case 'draw':
      // Semi-bluff about half the time
      if (Math.random() < 0.5) {
        return { action: 'bet', amount: Math.min(halfPot, stack) };
      }
      return { action: 'check', amount: 0 };

    case 'air':
      // Bluff occasionally, more if in position
      if (Math.random() < (isLast ? 0.25 : 0.12)) {
        return { action: 'bet', amount: Math.min(twothirdsPot, stack) };
      }
      return { action: 'check', amount: 0 };
  }
}

function aiPostflopFacingBet(
  category: ReturnType<typeof categorizePostflopHand>,
  amountToCall: number,
  pot: number,
  stack: number,
  isLast: boolean,
): { action: SimAction; amount: number } {
  const potOdds = amountToCall / (pot + amountToCall);

  switch (category) {
    case 'monster':
      // Raise for value
      if (Math.random() < 0.6) {
        const raiseAmount = Math.min(Math.round(amountToCall * 3), stack);
        return { action: 'raise', amount: raiseAmount };
      }
      return { action: 'call', amount: amountToCall };

    case 'strong':
      // Usually call, sometimes raise
      if (Math.random() < 0.2) {
        const raiseAmount = Math.min(Math.round(amountToCall * 2.5), stack);
        return { action: 'raise', amount: raiseAmount };
      }
      return { action: 'call', amount: amountToCall };

    case 'medium':
      // Call small bets, fold large ones
      if (potOdds < 0.3) {
        return { action: 'call', amount: amountToCall };
      }
      if (Math.random() < 0.3) {
        return { action: 'call', amount: amountToCall };
      }
      return { action: 'fold', amount: 0 };

    case 'draw':
      // Call if getting reasonable odds
      if (potOdds < 0.35) {
        return { action: 'call', amount: amountToCall };
      }
      // Occasionally raise as semi-bluff
      if (Math.random() < 0.15) {
        const raiseAmount = Math.min(Math.round(amountToCall * 2.5), stack);
        return { action: 'raise', amount: raiseAmount };
      }
      return { action: 'fold', amount: 0 };

    case 'air':
      // Almost always fold
      if (Math.random() < 0.08) {
        const raiseAmount = Math.min(Math.round((pot + amountToCall) * 0.75), stack);
        return { action: 'raise', amount: raiseAmount };
      }
      return { action: 'fold', amount: 0 };
  }
}
