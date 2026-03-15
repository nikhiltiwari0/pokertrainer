import { Card, Suit, Rank } from '@/types';
import { PotOddsScenario, PotOddsResult } from '@/types/potOdds';
import { createDeck, shuffle } from './deck';

interface DrawSetup {
  description: string;
  outs: number;
  // Function that creates hole cards + board with this draw
  generate: () => { holeCards: [Card, Card]; board: Card[] };
}

function card(rank: Rank, suit: Suit): Card {
  return { rank, suit };
}

const DRAW_SETUPS: DrawSetup[] = [
  {
    description: 'Flush draw',
    outs: 9,
    generate: () => {
      const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
      const flushSuit = suits[Math.floor(Math.random() * suits.length)];
      const otherSuit = suits.find(s => s !== flushSuit)!;
      const ranks: Rank[] = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
      const shuffled = [...ranks].sort(() => Math.random() - 0.5);
      return {
        holeCards: [card(shuffled[0], flushSuit), card(shuffled[1], flushSuit)] as [Card, Card],
        board: [
          card(shuffled[2], flushSuit),
          card(shuffled[3], flushSuit),
          card(shuffled[4], otherSuit),
        ],
      };
    },
  },
  {
    description: 'Open-ended straight draw',
    outs: 8,
    generate: () => {
      const starts = ['3','4','5','6','7','8','9'] as Rank[];
      const allRanks: Rank[] = ['A','2','3','4','5','6','7','8','9','T','J','Q','K','A'];
      const startIdx = Math.floor(Math.random() * starts.length);
      const startRank = starts[startIdx];
      const baseIdx = allRanks.indexOf(startRank);
      const fourCards = allRanks.slice(baseIdx, baseIdx + 4) as Rank[];
      const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
      return {
        holeCards: [
          card(fourCards[0], suits[0]),
          card(fourCards[1], suits[1]),
        ] as [Card, Card],
        board: [
          card(fourCards[2], suits[2]),
          card(fourCards[3], suits[3]),
          card('2' as Rank, suits[0]),
        ],
      };
    },
  },
  {
    description: 'Gutshot straight draw',
    outs: 4,
    generate: () => {
      const starts = ['4','5','6','7','8','9','T'] as Rank[];
      const allRanks: Rank[] = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
      const startIdx = Math.floor(Math.random() * starts.length);
      const startRank = starts[startIdx];
      const baseIdx = allRanks.indexOf(startRank);
      const fiveCards = allRanks.slice(baseIdx, baseIdx + 5) as Rank[];
      // Remove the middle card to make a gutshot
      const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
      return {
        holeCards: [
          card(fiveCards[0], suits[0]),
          card(fiveCards[1], suits[1]),
        ] as [Card, Card],
        board: [
          card(fiveCards[3], suits[2]),
          card(fiveCards[4], suits[3]),
          card('2' as Rank, suits[0]),
        ],
      };
    },
  },
  {
    description: 'Two overcards',
    outs: 6,
    generate: () => {
      return {
        holeCards: [card('A', 'spades'), card('K', 'hearts')] as [Card, Card],
        board: [card('8', 'diamonds'), card('5', 'clubs'), card('3', 'spades')],
      };
    },
  },
];

const POT_SIZES = [60, 80, 100, 120, 150, 200];
const BET_SIZES_FRAC = [0.33, 0.5, 0.66, 0.75, 1.0];

export function generatePotOddsScenario(): PotOddsScenario {
  const setup = DRAW_SETUPS[Math.floor(Math.random() * DRAW_SETUPS.length)];
  const { holeCards, board } = setup.generate();

  const street: 'flop' | 'turn' = Math.random() > 0.5 ? 'flop' : 'turn';

  // If turn, add a 4th card
  if (street === 'turn' && board.length === 3) {
    const deck = shuffle(createDeck());
    const used = new Set([...holeCards, ...board].map(c => `${c.rank}${c.suit}`));
    const extra = deck.find(c => !used.has(`${c.rank}${c.suit}`))!;
    board.push(extra);
  }

  const potSize = POT_SIZES[Math.floor(Math.random() * POT_SIZES.length)];
  const betFrac = BET_SIZES_FRAC[Math.floor(Math.random() * BET_SIZES_FRAC.length)];
  const betSize = Math.round(potSize * betFrac);

  const correctPotOdds = Math.round((betSize / (potSize + betSize + betSize)) * 100);
  const equity = street === 'flop' ? setup.outs * 4 : setup.outs * 2;
  const correctDecision: 'call' | 'fold' = equity >= correctPotOdds ? 'call' : 'fold';

  return {
    id: Math.random().toString(36).slice(2),
    holeCards,
    board,
    potSize,
    betSize,
    correctPotOdds,
    outs: setup.outs,
    equity,
    correctDecision,
    street,
    drawDescription: setup.description,
  };
}

export function checkPotOdds(
  scenario: PotOddsScenario,
  playerDecision: 'call' | 'fold'
): PotOddsResult {
  return {
    scenario,
    playerDecision,
    isCorrect: playerDecision === scenario.correctDecision,
  };
}
