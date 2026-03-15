import { Card, Rank, Suit, RANKS } from '@/types';
import { MadeHandType } from '@/types/handRecognition';

const RANK_VALUE: Record<Rank, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8,
  '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14,
};

function getRankCounts(cards: Card[]): Map<Rank, number> {
  const counts = new Map<Rank, number>();
  for (const card of cards) {
    counts.set(card.rank, (counts.get(card.rank) ?? 0) + 1);
  }
  return counts;
}

function getSuitCounts(cards: Card[]): Map<Suit, Card[]> {
  const suits = new Map<Suit, Card[]>();
  for (const card of cards) {
    if (!suits.has(card.suit)) suits.set(card.suit, []);
    suits.get(card.suit)!.push(card);
  }
  return suits;
}

function hasStraight(cards: Card[]): boolean {
  const values = new Set(cards.map(c => RANK_VALUE[c.rank]));
  // Check ace-low straight (A-2-3-4-5)
  if (values.has(14) && values.has(2) && values.has(3) && values.has(4) && values.has(5)) {
    return true;
  }
  // Check normal straights
  const sorted = [...values].sort((a, b) => a - b);
  for (let i = 0; i <= sorted.length - 5; i++) {
    if (sorted[i + 4] - sorted[i] === 4) {
      // Check all 5 values are present
      let isConsecutive = true;
      for (let j = 1; j < 5; j++) {
        if (!values.has(sorted[i] + j)) {
          isConsecutive = false;
          break;
        }
      }
      if (isConsecutive) return true;
    }
  }
  return false;
}

function hasFlush(cards: Card[]): Suit | null {
  const suits = getSuitCounts(cards);
  for (const [suit, suitCards] of suits) {
    if (suitCards.length >= 5) return suit;
  }
  return null;
}

function hasStraightFlush(cards: Card[]): boolean {
  const suits = getSuitCounts(cards);
  for (const [, suitCards] of suits) {
    if (suitCards.length >= 5 && hasStraight(suitCards)) {
      return true;
    }
  }
  return false;
}

export function evaluateHand(holeCards: [Card, Card], board: Card[]): MadeHandType {
  const allCards = [...holeCards, ...board];

  // Check straight flush first
  if (hasStraightFlush(allCards)) {
    return 'straight-flush';
  }

  const rankCounts = getRankCounts(allCards);
  const counts = [...rankCounts.values()].sort((a, b) => b - a);

  // Four of a kind
  if (counts[0] >= 4) {
    return 'four-of-a-kind';
  }

  // Full house (3+2 or 3+3)
  if (counts[0] >= 3 && counts[1] >= 2) {
    return 'full-house';
  }

  // Flush
  if (hasFlush(allCards) !== null) {
    return 'flush';
  }

  // Straight
  if (hasStraight(allCards)) {
    return 'straight';
  }

  // Three of a kind
  if (counts[0] >= 3) {
    return 'three-of-a-kind';
  }

  // Two pair
  if (counts[0] >= 2 && counts[1] >= 2) {
    return 'two-pair';
  }

  // One pair
  if (counts[0] >= 2) {
    return 'pair';
  }

  return 'high-card';
}
