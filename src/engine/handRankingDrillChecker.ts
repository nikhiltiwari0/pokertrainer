import { Card, Rank, Suit } from '@/types';
import { MadeHandType } from '@/types/handRecognition';
import { HandRankingScenario, HandRankingResult } from '@/types/handRankingDrill';
import { createDeck, shuffle } from './deck';
import { evaluateHand } from './boardEvaluator';

const HAND_STRENGTH: Record<MadeHandType, number> = {
  'high-card': 0,
  'pair': 1,
  'two-pair': 2,
  'three-of-a-kind': 3,
  'straight': 4,
  'flush': 5,
  'full-house': 6,
  'four-of-a-kind': 7,
  'straight-flush': 8,
};

const HAND_LABELS: Record<MadeHandType, string> = {
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

const RANK_VALUE: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
  '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

/**
 * Get a numeric score for a 7-card hand (2 hole + 5 board) for comparison.
 * Returns [handTypeStrength, ...tiebreakers]
 */
export function getHandScore(holeCards: [Card, Card], board: Card[]): number[] {
  const allCards = [...holeCards, ...board];
  const handType = evaluateHand(holeCards, board);
  const typeScore = HAND_STRENGTH[handType];

  const rankCounts = new Map<Rank, number>();
  for (const c of allCards) {
    rankCounts.set(c.rank, (rankCounts.get(c.rank) ?? 0) + 1);
  }

  // Sort ranks by count desc, then by value desc
  const sorted = [...rankCounts.entries()]
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return RANK_VALUE[b[0]] - RANK_VALUE[a[0]];
    });

  // Build tiebreaker based on hand type
  const tiebreakers: number[] = [];

  switch (handType) {
    case 'four-of-a-kind': {
      const quad = sorted.find(([, c]) => c >= 4)!;
      const kicker = sorted.filter(([r]) => r !== quad[0]).sort((a, b) => RANK_VALUE[b[0]] - RANK_VALUE[a[0]])[0];
      tiebreakers.push(RANK_VALUE[quad[0]], kicker ? RANK_VALUE[kicker[0]] : 0);
      break;
    }
    case 'full-house': {
      const trips = sorted.find(([, c]) => c >= 3)!;
      const pair = sorted.find(([r, c]) => c >= 2 && r !== trips[0])!;
      tiebreakers.push(RANK_VALUE[trips[0]], pair ? RANK_VALUE[pair[0]] : 0);
      break;
    }
    case 'three-of-a-kind': {
      const trips = sorted.find(([, c]) => c >= 3)!;
      const kickers = sorted.filter(([r]) => r !== trips[0]).sort((a, b) => RANK_VALUE[b[0]] - RANK_VALUE[a[0]]);
      tiebreakers.push(RANK_VALUE[trips[0]], ...kickers.slice(0, 2).map(([r]) => RANK_VALUE[r]));
      break;
    }
    case 'two-pair': {
      const pairs = sorted.filter(([, c]) => c >= 2).sort((a, b) => RANK_VALUE[b[0]] - RANK_VALUE[a[0]]);
      const kicker = sorted.filter(([r]) => !pairs.slice(0, 2).some(([pr]) => pr === r)).sort((a, b) => RANK_VALUE[b[0]] - RANK_VALUE[a[0]])[0];
      tiebreakers.push(RANK_VALUE[pairs[0][0]], RANK_VALUE[pairs[1][0]], kicker ? RANK_VALUE[kicker[0]] : 0);
      break;
    }
    case 'pair': {
      const pair = sorted.find(([, c]) => c >= 2)!;
      const kickers = sorted.filter(([r]) => r !== pair[0]).sort((a, b) => RANK_VALUE[b[0]] - RANK_VALUE[a[0]]);
      tiebreakers.push(RANK_VALUE[pair[0]], ...kickers.slice(0, 3).map(([r]) => RANK_VALUE[r]));
      break;
    }
    default: {
      // High card, straight, flush, straight flush — just use top 5 card values
      const values = allCards.map(c => RANK_VALUE[c.rank]).sort((a, b) => b - a);
      tiebreakers.push(...values.slice(0, 5));
    }
  }

  return [typeScore, ...tiebreakers];
}

export function compareScores(a: number[], b: number[]): number {
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const va = a[i] ?? 0;
    const vb = b[i] ?? 0;
    if (va !== vb) return va - vb;
  }
  return 0;
}

export function generateHandRankingScenario(): HandRankingScenario {
  // Try to generate interesting matchups (different hand types)
  let bestScenario: HandRankingScenario | null = null;

  for (let attempt = 0; attempt < 30; attempt++) {
    const deck = shuffle(createDeck());
    const handA: [Card, Card] = [deck[0], deck[1]];
    const handB: [Card, Card] = [deck[2], deck[3]];
    const board = deck.slice(4, 9);

    const typeA = evaluateHand(handA, board);
    const typeB = evaluateHand(handB, board);
    const scoreA = getHandScore(handA, board);
    const scoreB = getHandScore(handB, board);
    const cmp = compareScores(scoreA, scoreB);

    const correctAnswer: 'A' | 'B' | 'tie' = cmp > 0 ? 'A' : cmp < 0 ? 'B' : 'tie';

    const scenario: HandRankingScenario = {
      id: Math.random().toString(36).slice(2),
      handA,
      handB,
      board,
      correctAnswer,
      handAType: typeA,
      handBType: typeB,
    };

    // Prefer scenarios where both hands are at least a pair,
    // and where the two hand types are different (more educational)
    const bothHaveSomething = HAND_STRENGTH[typeA] >= 1 && HAND_STRENGTH[typeB] >= 1;
    const differentTypes = typeA !== typeB;

    if (bothHaveSomething && differentTypes) {
      return scenario;
    }

    if (bothHaveSomething && !bestScenario) {
      bestScenario = scenario;
    }

    if (!bestScenario) {
      bestScenario = scenario;
    }
  }

  return bestScenario!;
}

export function checkHandRanking(
  scenario: HandRankingScenario,
  playerAnswer: 'A' | 'B' | 'tie'
): HandRankingResult {
  return {
    scenario,
    playerAnswer,
    isCorrect: playerAnswer === scenario.correctAnswer,
  };
}

export function getHandLabel(type: MadeHandType): string {
  return HAND_LABELS[type];
}
