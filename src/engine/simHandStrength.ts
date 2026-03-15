import { Card, Rank } from '@/types';
import { evaluateHand } from './boardEvaluator';
import { MadeHandType } from '@/types/handRecognition';

export type HandStrengthCategory = 'monster' | 'strong' | 'medium' | 'draw' | 'air';

const RANK_VALUE: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
  '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

const STRONG_KICKERS: Rank[] = ['A', 'K', 'Q', 'J'];

export function hasFlushDraw(holeCards: [Card, Card], board: Card[]): boolean {
  for (const suit of ['spades', 'hearts', 'diamonds', 'clubs'] as const) {
    const count = [...holeCards, ...board].filter(c => c.suit === suit).length;
    const heroHas = holeCards.some(c => c.suit === suit);
    if (count === 4 && heroHas) return true;
  }
  return false;
}

export function hasOpenEndedStraightDraw(holeCards: [Card, Card], board: Card[]): boolean {
  const allCards = [...holeCards, ...board];
  const values = new Set(allCards.map(c => RANK_VALUE[c.rank]));
  const heroValues = new Set(holeCards.map(c => RANK_VALUE[c.rank]));

  // Check for 4 consecutive cards where at least one is from hero's hand
  const sorted = [...values].sort((a, b) => a - b);
  for (let i = 0; i <= sorted.length - 4; i++) {
    if (sorted[i + 3] - sorted[i] === 3) {
      const run = [sorted[i], sorted[i] + 1, sorted[i] + 2, sorted[i] + 3];
      if (run.every(v => values.has(v)) && run.some(v => heroValues.has(v))) {
        // Check it's actually open-ended (not gutshot)
        const low = run[0];
        const high = run[3];
        if (low > 2 && high < 14) return true; // cards available on both ends
      }
    }
  }
  return false;
}

function getBoardHighCards(board: Card[]): number[] {
  return board.map(c => RANK_VALUE[c.rank]).sort((a, b) => b - a);
}

export function categorizePostflopHand(
  holeCards: [Card, Card],
  board: Card[],
): HandStrengthCategory {
  const handType = evaluateHand(holeCards, board);

  // Monster: two-pair or better
  if (['straight-flush', 'four-of-a-kind', 'full-house', 'flush', 'straight', 'two-pair'].includes(handType)) {
    return 'monster';
  }

  // Three of a kind
  if (handType === 'three-of-a-kind') {
    return 'monster';
  }

  // Pair
  if (handType === 'pair') {
    const boardRanks = board.map(c => c.rank);
    const heroRanks = holeCards.map(c => c.rank);

    // Check if the pair involves a hole card
    const pairRank = heroRanks.find(r => boardRanks.includes(r));

    if (pairRank) {
      // Hero has a pair with the board
      const boardHighest = getBoardHighCards(board);

      if (RANK_VALUE[pairRank] === boardHighest[0]) {
        // Top pair — check kicker
        const kicker = heroRanks.find(r => r !== pairRank);
        if (kicker && STRONG_KICKERS.includes(kicker)) {
          return 'strong';
        }
        return 'medium';
      }

      // Overpair
      if (RANK_VALUE[pairRank] > boardHighest[0]) {
        return 'strong';
      }

      // Middle or bottom pair
      return 'medium';
    }

    // Pocket pair below board = medium
    const heroHasPocketPair = heroRanks[0] === heroRanks[1];
    if (heroHasPocketPair) {
      const boardHighest = getBoardHighCards(board);
      if (RANK_VALUE[heroRanks[0]] > boardHighest[0]) {
        return 'strong'; // overpair
      }
      return 'medium';
    }

    // Board has a pair (doesn't involve hero) — hero has high card effectively
    // Fall through to draw/air check
  }

  // High card — check for draws
  if (board.length >= 3) {
    if (hasFlushDraw(holeCards, board)) return 'draw';
    if (hasOpenEndedStraightDraw(holeCards, board)) return 'draw';
  }

  return 'air';
}

export function getHandTypeLabel(type: MadeHandType): string {
  const labels: Record<MadeHandType, string> = {
    'high-card': 'High Card',
    'pair': 'Pair',
    'two-pair': 'Two Pair',
    'three-of-a-kind': 'Three of a Kind',
    'straight': 'Straight',
    'flush': 'Flush',
    'full-house': 'Full House',
    'four-of-a-kind': 'Four of a Kind',
    'straight-flush': 'Straight Flush',
  };
  return labels[type];
}
