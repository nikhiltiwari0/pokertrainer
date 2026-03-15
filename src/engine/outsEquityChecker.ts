import { Card, Rank, Suit } from '@/types';
import { OutsEquityScenario, OutsEquityResult, OutsEquityQuestionType } from '@/types/outsEquity';
import { createDeck, shuffle } from './deck';

interface DrawSetup {
  description: string;
  outs: number;
  explanation: string;
  generate: () => { holeCards: [Card, Card]; board: Card[] };
}

function card(rank: Rank, suit: Suit): Card {
  return { rank, suit };
}

const DRAW_SETUPS: DrawSetup[] = [
  {
    description: 'flush draw',
    outs: 9,
    explanation: '9 outs. There are 13 cards of each suit, you can see 4, so 9 remain.',
    generate: () => {
      const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
      const flushSuit = suits[Math.floor(Math.random() * suits.length)];
      const otherSuit = suits.find(s => s !== flushSuit)!;
      const ranks: Rank[] = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
      const shuffled = [...ranks].sort(() => Math.random() - 0.5);
      return {
        holeCards: [card(shuffled[0], flushSuit), card(shuffled[1], flushSuit)] as [Card, Card],
        board: [card(shuffled[2], flushSuit), card(shuffled[3], flushSuit), card(shuffled[4], otherSuit)],
      };
    },
  },
  {
    description: 'open-ended straight draw',
    outs: 8,
    explanation: '8 outs. You need one card on either end of your four in a row. That\'s 4 cards on each side = 8 total.',
    generate: () => {
      const starts = ['3','4','5','6','7','8','9'] as Rank[];
      const allRanks: Rank[] = ['A','2','3','4','5','6','7','8','9','T','J','Q','K','A'];
      const startIdx = Math.floor(Math.random() * starts.length);
      const startRank = starts[startIdx];
      const baseIdx = allRanks.indexOf(startRank);
      const fourCards = allRanks.slice(baseIdx, baseIdx + 4) as Rank[];
      const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
      return {
        holeCards: [card(fourCards[0], suits[0]), card(fourCards[1], suits[1])] as [Card, Card],
        board: [card(fourCards[2], suits[2]), card(fourCards[3], suits[3]), card('2' as Rank, suits[0])],
      };
    },
  },
  {
    description: 'gutshot straight draw',
    outs: 4,
    explanation: '4 outs. You need one specific rank to fill the gap in your straight. There are 4 cards of that rank in the deck.',
    generate: () => {
      const starts = ['4','5','6','7','8','9','T'] as Rank[];
      const allRanks: Rank[] = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
      const startIdx = Math.floor(Math.random() * starts.length);
      const startRank = starts[startIdx];
      const baseIdx = allRanks.indexOf(startRank);
      const fiveCards = allRanks.slice(baseIdx, baseIdx + 5) as Rank[];
      const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
      return {
        holeCards: [card(fiveCards[0], suits[0]), card(fiveCards[1], suits[1])] as [Card, Card],
        board: [card(fiveCards[3], suits[2]), card(fiveCards[4], suits[3]), card('2' as Rank, suits[0])],
      };
    },
  },
  {
    description: 'two overcards',
    outs: 6,
    explanation: '6 outs. You need to pair one of your two overcards. 3 cards of each rank = 6 total.',
    generate: () => {
      const highCards: [Rank, Rank][] = [['A','K'], ['A','Q'], ['K','Q']];
      const pick = highCards[Math.floor(Math.random() * highCards.length)];
      const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
      const lowRanks: Rank[] = ['8','7','6','5','4','3'];
      const shuffledLow = [...lowRanks].sort(() => Math.random() - 0.5);
      return {
        holeCards: [card(pick[0], suits[0]), card(pick[1], suits[1])] as [Card, Card],
        board: [card(shuffledLow[0], suits[2]), card(shuffledLow[1], suits[3]), card(shuffledLow[2], suits[0])],
      };
    },
  },
  {
    description: 'flush draw + one overcard',
    outs: 12,
    explanation: '12 outs. 9 flush outs plus 3 more cards that pair your overcard (the ones that aren\'t already counted as flush outs).',
    generate: () => {
      const suits: Suit[] = ['hearts', 'diamonds', 'spades', 'clubs'];
      const flushSuit = suits[Math.floor(Math.random() * suits.length)];
      const otherSuits = suits.filter(s => s !== flushSuit);
      return {
        holeCards: [card('A', flushSuit), card('8', flushSuit)] as [Card, Card],
        board: [
          card('6', flushSuit),
          card('T', flushSuit),
          card('3', otherSuits[0]),
        ],
      };
    },
  },
];

// Generate plausible wrong options near the correct answer
function generateOutsOptions(correctOuts: number): { options: number[]; correctIndex: number } {
  const allOuts = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15];
  const wrong = allOuts.filter(o => o !== correctOuts);
  // Pick 3 wrong answers, preferring ones near the correct
  const sorted = [...wrong].sort((a, b) => Math.abs(a - correctOuts) - Math.abs(b - correctOuts));
  const picked = sorted.slice(0, 3);
  const options = [...picked, correctOuts].sort((a, b) => a - b);
  const correctIndex = options.indexOf(correctOuts);
  return { options, correctIndex };
}

function generateEquityOptions(correctEquity: number): { options: number[]; correctIndex: number } {
  const possibleEquities = [4, 8, 12, 16, 18, 24, 32, 36, 40, 48];
  const wrong = possibleEquities.filter(e => e !== correctEquity);
  const sorted = [...wrong].sort((a, b) => Math.abs(a - correctEquity) - Math.abs(b - correctEquity));
  const picked = sorted.slice(0, 3);
  const options = [...picked, correctEquity].sort((a, b) => a - b);
  const correctIndex = options.indexOf(correctEquity);
  return { options, correctIndex };
}

export function generateOutsEquityScenario(): OutsEquityScenario {
  const setup = DRAW_SETUPS[Math.floor(Math.random() * DRAW_SETUPS.length)];
  const { holeCards, board } = setup.generate();

  const street: 'flop' | 'turn' = Math.random() > 0.5 ? 'flop' : 'turn';

  // If turn, add a 4th card
  const finalBoard = [...board];
  if (street === 'turn' && finalBoard.length === 3) {
    const deck = shuffle(createDeck());
    const used = new Set([...holeCards, ...finalBoard].map(c => `${c.rank}${c.suit}`));
    const extra = deck.find(c => !used.has(`${c.rank}${c.suit}`))!;
    finalBoard.push(extra);
  }

  const correctEquity = street === 'flop' ? setup.outs * 4 : setup.outs * 2;
  const questionType: OutsEquityQuestionType = Math.random() > 0.5 ? 'outs' : 'equity';

  let options: number[];
  let correctIndex: number;

  if (questionType === 'outs') {
    const generated = generateOutsOptions(setup.outs);
    options = generated.options;
    correctIndex = generated.correctIndex;
  } else {
    const generated = generateEquityOptions(correctEquity);
    options = generated.options;
    correctIndex = generated.correctIndex;
  }

  return {
    id: Math.random().toString(36).slice(2),
    holeCards,
    board: finalBoard,
    street,
    drawDescription: setup.description,
    correctOuts: setup.outs,
    correctEquity,
    questionType,
    options,
    correctIndex,
  };
}

export function checkOutsEquity(
  scenario: OutsEquityScenario,
  playerAnswerIndex: number
): OutsEquityResult {
  return {
    scenario,
    playerAnswerIndex,
    isCorrect: playerAnswerIndex === scenario.correctIndex,
  };
}

export function getOutsExplanation(scenario: OutsEquityScenario): string {
  const setup = DRAW_SETUPS.find(d => d.outs === scenario.correctOuts && d.description === scenario.drawDescription);
  const outsExpl = setup?.explanation ?? `${scenario.correctOuts} outs.`;
  const multiplier = scenario.street === 'flop' ? 4 : 2;
  const equityExpl = `${scenario.correctOuts} outs x ${multiplier} = ~${scenario.correctEquity}% equity (Rule of ${multiplier === 4 ? '4' : '2'}, ${scenario.street}).`;
  return `${outsExpl}\n${equityExpl}`;
}
