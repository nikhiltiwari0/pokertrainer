'use client';

import { ShowdownResult } from '@/types/simulation';
import { SUIT_SYMBOLS, SUIT_COLORS } from '@/types';
import { getHandTypeLabel } from '@/engine/simHandStrength';

interface SimShowdownRevealProps {
  result: ShowdownResult;
  onContinue: () => void;
}

export default function SimShowdownReveal({ result, onContinue }: SimShowdownRevealProps) {
  const { winners, potAwarded, playerHands } = result;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Winner announcement */}
      <div className="text-center">
        <p className="text-gold font-display text-xl mb-1">
          {winners.length === 1
            ? `${result.winnerPositions[0]} wins ${potAwarded} chips`
            : `Split pot: ${result.winnerPositions.join(' & ')} — ${potAwarded} chips`
          }
        </p>
        {result.heroSurvived && winners.some(w => playerHands.find(p => p.playerId === w)?.position === playerHands.find(p => !p.isFolded && playerHands.findIndex(pp => pp.playerId === p.playerId) !== -1)?.position) ? null : null}
      </div>

      {/* All hands */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {playerHands.map(ph => {
          const isWinner = winners.includes(ph.playerId);
          return (
            <div
              key={ph.playerId}
              className={`
                bg-gray-900/50 rounded-lg p-3 border transition-all
                ${ph.isFolded
                  ? 'border-gray-800/30 opacity-40'
                  : isWinner
                    ? 'border-gold/40 bg-gold/5'
                    : 'border-gray-800/40'
                }
              `}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold ${isWinner ? 'text-gold' : 'text-gray-400'}`}>
                  {ph.position}
                </span>
                {isWinner && <span className="text-[9px] text-gold bg-gold/10 px-1.5 py-0.5 rounded font-medium">Winner</span>}
              </div>
              {ph.isFolded ? (
                <span className="text-[10px] text-gray-600">Folded</span>
              ) : (
                <>
                  <div className="flex gap-1 mb-1">
                    {ph.holeCards.map((c, i) => {
                      const color = SUIT_COLORS[c.suit] === 'red' ? 'text-[#c0392b]' : 'text-[#1a1a2e]';
                      return (
                        <span
                          key={i}
                          className={`inline-flex items-center justify-center w-6 h-8 rounded bg-card-face border border-card-border text-[10px] font-bold ${color}`}
                        >
                          {c.rank}{SUIT_SYMBOLS[c.suit]}
                        </span>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-gray-500">{getHandTypeLabel(ph.handType)}</span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Continue button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onContinue}
          className="px-6 py-2.5 text-sm font-bold bg-gold/15 text-gold rounded-xl border border-gold/25 hover:bg-gold/25 transition-all duration-200 hover:translate-y-[-1px]"
        >
          Review Decisions
        </button>
      </div>
    </div>
  );
}
