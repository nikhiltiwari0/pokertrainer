'use client';

import { Card, SUIT_SYMBOLS, SUIT_COLORS } from '@/types';

interface SimCommunityCardsProps {
  cards: Card[];
}

export default function SimCommunityCards({ cards }: SimCommunityCardsProps) {
  if (cards.length === 0) return null;

  return (
    <div className="flex items-center gap-1.5">
      {cards.map((card, i) => {
        const color = SUIT_COLORS[card.suit] === 'red' ? 'text-[#c0392b]' : 'text-[#1a1a2e]';
        return (
          <div
            key={`${card.rank}-${card.suit}-${i}`}
            className="w-10 h-14 sm:w-12 sm:h-16 rounded-lg bg-card-face border border-card-border shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center animate-scale-in"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className={`text-sm sm:text-base font-bold ${color}`}>{card.rank}</span>
            <span className={`text-xs sm:text-sm ${color}`}>{SUIT_SYMBOLS[card.suit]}</span>
          </div>
        );
      })}
    </div>
  );
}
