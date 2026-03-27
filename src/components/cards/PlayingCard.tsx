'use client';

import { Card, SUIT_SYMBOLS, SUIT_COLORS } from '@/types';

interface PlayingCardProps {
  card: Card;
  className?: string;
}

export default function PlayingCard({ card, className = '' }: PlayingCardProps) {
  const symbol = SUIT_SYMBOLS[card.suit];
  const color = SUIT_COLORS[card.suit];
  const textColor = color === 'red' ? 'text-[#c0392b]' : 'text-[#1a1a2e]';

  return (
    <div
      className={`
        relative w-20 h-28 sm:w-28 sm:h-40 rounded-xl
        bg-card-face border border-card-border
        shadow-[0_4px_16px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.2)]
        select-none flex flex-col justify-between p-1.5 sm:p-2
        transition-transform duration-200 hover:translate-y-[-2px]
        ${className}
      `}
    >
      {/* Top-left corner */}
      <div className={`flex flex-col items-center leading-none ${textColor}`}>
        <span className="text-base sm:text-lg font-bold">{card.rank}</span>
        <span className="text-sm sm:text-base">{symbol}</span>
      </div>

      {/* Center suit */}
      <div className={`absolute inset-0 flex items-center justify-center ${textColor}`}>
        <span className="text-3xl sm:text-4xl opacity-80">{symbol}</span>
      </div>

      {/* Bottom-right corner (rotated) */}
      <div className={`flex flex-col items-center leading-none self-end rotate-180 ${textColor}`}>
        <span className="text-base sm:text-lg font-bold">{card.rank}</span>
        <span className="text-sm sm:text-base">{symbol}</span>
      </div>
    </div>
  );
}
