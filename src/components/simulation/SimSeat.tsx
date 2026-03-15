'use client';

import { SimPlayer } from '@/types/simulation';
import { SUIT_SYMBOLS, SUIT_COLORS } from '@/types';

interface SimSeatProps {
  player: SimPlayer;
  isDealer: boolean;
  isActive: boolean;
  showCards: boolean;
}

export default function SimSeat({ player, isDealer, isActive, showCards }: SimSeatProps) {
  const { position, stack, isFolded, isAllIn, currentBet, isHero, holeCards } = player;

  return (
    <div className={`flex flex-col items-center gap-1 transition-opacity duration-300 ${isFolded ? 'opacity-40' : ''}`}>
      {/* Cards */}
      <div className="flex gap-0.5 h-8">
        {(isHero || showCards) && !isFolded ? (
          holeCards.map((card, i) => {
            const color = SUIT_COLORS[card.suit] === 'red' ? 'text-[#c0392b]' : 'text-[#1a1a2e]';
            return (
              <div
                key={i}
                className="w-6 h-8 rounded bg-card-face border border-card-border flex items-center justify-center text-[10px] font-bold shadow-sm"
              >
                <span className={color}>{card.rank}{SUIT_SYMBOLS[card.suit]}</span>
              </div>
            );
          })
        ) : !isFolded ? (
          <>
            <div className="w-6 h-8 rounded bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800/50 shadow-sm" />
            <div className="w-6 h-8 rounded bg-gradient-to-br from-blue-900 to-blue-950 border border-blue-800/50 shadow-sm" />
          </>
        ) : null}
      </div>

      {/* Position chip */}
      <div
        className={`
          relative w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold
          transition-all duration-200
          ${isHero
            ? 'bg-gold/20 text-gold border-2 border-gold/40'
            : isActive
              ? 'bg-emerald-900/40 text-emerald-300 border-2 border-emerald-500/50 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
              : 'bg-gray-800/60 text-gray-400 border border-gray-700/60'
          }
        `}
      >
        {position}
        {isDealer && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-[8px] text-gray-900 font-black flex items-center justify-center shadow">
            D
          </span>
        )}
      </div>

      {/* Stack */}
      <div className="text-[10px] text-gray-400 font-mono">
        {isAllIn ? (
          <span className="text-rose-400 font-bold">ALL IN</span>
        ) : isFolded ? (
          <span className="text-gray-600">Fold</span>
        ) : (
          <span>{stack}</span>
        )}
      </div>

      {/* Current bet */}
      {currentBet > 0 && !isFolded && (
        <div className="text-[10px] text-gold font-mono font-medium">
          {currentBet}
        </div>
      )}

      {/* Hero label */}
      {isHero && (
        <span className="text-[9px] text-gold/60 font-medium uppercase tracking-wider">You</span>
      )}
    </div>
  );
}
