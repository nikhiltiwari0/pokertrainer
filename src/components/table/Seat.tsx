'use client';

import { Position } from '@/types';

interface SeatProps {
  position: Position;
  isPlayer: boolean;
  action?: 'fold' | 'raise' | 'call' | '3bet';
}

const ACTION_STYLES: Record<string, string> = {
  fold: 'text-gray-500',
  raise: 'text-rose-400',
  call: 'text-emerald-400',
  '3bet': 'text-gold',
};

const ACTION_LABELS: Record<string, string> = {
  fold: 'Fold',
  raise: 'Raise',
  call: 'Call',
  '3bet': '3-Bet',
};

export default function Seat({ position, isPlayer, action }: SeatProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={`
          w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-sm sm:text-base font-bold
          transition-all duration-200
          ${isPlayer
            ? 'bg-gold/20 text-gold border-2 border-gold/40 shadow-[0_0_16px_rgba(201,168,76,0.15)]'
            : 'bg-gray-800/60 text-gray-400 border border-gray-700/60'
          }
        `}
      >
        {position}
      </div>
      {action && (
        <span className={`text-[10px] sm:text-xs font-medium ${ACTION_STYLES[action]}`}>
          {ACTION_LABELS[action]}
        </span>
      )}
      {isPlayer && !action && (
        <span className="text-[10px] sm:text-xs font-medium text-gold/70">You</span>
      )}
    </div>
  );
}
