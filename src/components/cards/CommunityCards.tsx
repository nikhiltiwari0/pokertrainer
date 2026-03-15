'use client';

import { Card } from '@/types';
import PlayingCard from './PlayingCard';

interface CommunityCardsProps {
  cards: Card[];
}

export default function CommunityCards({ cards }: CommunityCardsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {cards.map((card, i) => (
        <PlayingCard
          key={`${card.rank}-${card.suit}-${i}`}
          card={card}
          className="w-16 h-24 sm:w-20 sm:h-28"
        />
      ))}
    </div>
  );
}
