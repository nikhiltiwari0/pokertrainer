import { Card, Rank, RANKS } from '@/types';
import { HandNotation, HandCategory } from '@/types';

const RANK_INDEX: Record<Rank, number> = Object.fromEntries(
  RANKS.map((r, i) => [r, i])
) as Record<Rank, number>;

export function toHandNotation(card1: Card, card2: Card): HandNotation {
  const idx1 = RANK_INDEX[card1.rank];
  const idx2 = RANK_INDEX[card2.rank];

  const [high, low] = idx1 <= idx2 ? [card1, card2] : [card2, card1];

  if (high.rank === low.rank) {
    return `${high.rank}${low.rank}`;
  }

  const suffix = high.suit === low.suit ? 's' : 'o';
  return `${high.rank}${low.rank}${suffix}`;
}

export function getHandCategory(notation: HandNotation): HandCategory {
  if (notation.length === 2) return 'pair';
  return notation.endsWith('s') ? 'suited' : 'offsuit';
}
