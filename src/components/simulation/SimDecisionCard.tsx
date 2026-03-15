'use client';

import { DecisionPoint } from '@/types/simulation';
import { SUIT_SYMBOLS, SUIT_COLORS } from '@/types';

interface SimDecisionCardProps {
  decision: DecisionPoint;
  index: number;
}

function formatAction(action: string, amount: number): string {
  if (action === 'fold' || action === 'check') return action.charAt(0).toUpperCase() + action.slice(1);
  const label = action.charAt(0).toUpperCase() + action.slice(1);
  return amount > 0 ? `${label} ${amount}` : label;
}

function MiniCard({ rank, suit }: { rank: string; suit: string }) {
  const symbol = SUIT_SYMBOLS[suit as keyof typeof SUIT_SYMBOLS];
  const color = SUIT_COLORS[suit as keyof typeof SUIT_COLORS] === 'red' ? 'text-[#c0392b]' : 'text-[#1a1a2e]';
  return (
    <span className={`inline-flex items-center justify-center w-5 h-7 rounded bg-card-face border border-card-border text-[9px] font-bold ${color}`}>
      {rank}{symbol}
    </span>
  );
}

export default function SimDecisionCard({ decision, index }: SimDecisionCardProps) {
  const { street, holeCards, communityCards, pot, heroAction, heroAmount, recommendedAction, recommendedAmount, isCorrect, explanation } = decision;

  return (
    <div
      className={`
        bg-gray-900/50 rounded-xl p-4 border transition-all duration-200
        ${isCorrect
          ? 'border-emerald-800/40'
          : 'border-rose-800/40'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{street}</span>
          <span className="text-gray-700">|</span>
          <span className="text-[10px] text-gray-500">Pot: {pot}</span>
        </div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${isCorrect ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
          {isCorrect ? 'Correct' : 'Mistake'}
        </span>
      </div>

      {/* Cards */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {holeCards.map((c, i) => <MiniCard key={i} rank={c.rank} suit={c.suit} />)}
        </div>
        {communityCards.length > 0 && (
          <>
            <span className="text-gray-700 text-xs">on</span>
            <div className="flex gap-0.5">
              {communityCards.map((c, i) => <MiniCard key={i} rank={c.rank} suit={c.suit} />)}
            </div>
          </>
        )}
      </div>

      {/* Actions comparison */}
      <div className="flex items-center gap-3 mb-2">
        <div>
          <span className="text-[10px] text-gray-500 block">You played</span>
          <span className={`text-sm font-bold ${isCorrect ? 'text-gray-200' : 'text-rose-300'}`}>
            {formatAction(heroAction, heroAmount)}
          </span>
        </div>
        {!isCorrect && (
          <>
            <span className="text-gray-700">&rarr;</span>
            <div>
              <span className="text-[10px] text-gray-500 block">Recommended</span>
              <span className="text-sm font-bold text-emerald-300">
                {formatAction(recommendedAction, recommendedAmount)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Explanation */}
      <p className="text-xs text-gray-400 leading-relaxed">{explanation}</p>
    </div>
  );
}
