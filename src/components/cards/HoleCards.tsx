'use client';

import { Card } from '@/types';
import PlayingCard from './PlayingCard';

interface HoleCardsProps {
  cards: [Card, Card];
}

export default function HoleCards({ cards }: HoleCardsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <PlayingCard card={cards[0]} className="-rotate-3" />
      <PlayingCard card={cards[1]} className="rotate-3" />
    </div>
  );
}
