'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DecisionPoint } from '@/types/simulation';
import { SUIT_SYMBOLS, SUIT_COLORS, Position, ScenarioType } from '@/types';
import { toHandNotation } from '@/engine/handEvaluator';
import { generateMatrix } from '@/engine/matrixGenerator';
import HandMatrix from '@/components/range/HandMatrix';

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

function getPreflopScenario(decision: DecisionPoint): { scenarioType: ScenarioType; raiserPosition?: Position } | null {
  if (decision.street !== 'preflop') return null;

  const preflopActions = decision.actionsBefore.filter(a => a.street === 'preflop');
  const raises = preflopActions.filter(a => a.action === 'raise' || a.action === 'bet');

  if (raises.length === 0) {
    return { scenarioType: 'RFI' };
  } else if (raises.length === 1) {
    return { scenarioType: 'FACING_RAISE', raiserPosition: raises[0].position };
  } else {
    // 3-bet pot — only show chart if hero was the original raiser
    const heroRaised = preflopActions.some(a => a.isHero && (a.action === 'raise' || a.action === 'bet'));
    if (heroRaised) {
      const threeBettor = raises[raises.length - 1];
      return { scenarioType: 'FACING_3BET', raiserPosition: threeBettor.position };
    }
    // Hero wasn't the raiser — show FACING_RAISE chart vs the original raiser as closest reference
    return { scenarioType: 'FACING_RAISE', raiserPosition: raises[0].position };
  }
}

export default function SimDecisionCard({ decision, index }: SimDecisionCardProps) {
  const { street, holeCards, communityCards, pot, heroAction, heroAmount, recommendedAction, recommendedAmount, isCorrect, explanation } = decision;
  const [showRange, setShowRange] = useState(false);

  const preflopScenario = getPreflopScenario(decision);
  const handNotation = street === 'preflop' ? toHandNotation(holeCards[0], holeCards[1]) : null;

  const matrixData = preflopScenario
    ? generateMatrix(preflopScenario.scenarioType, decision.position, preflopScenario.raiserPosition, handNotation ?? undefined)
    : null;

  const scenarioLabels: Record<ScenarioType, string> = {
    RFI: `RFI from ${decision.position}`,
    FACING_RAISE: `Facing raise from ${preflopScenario?.raiserPosition} in ${decision.position}`,
    FACING_3BET: `Facing 3-bet from ${preflopScenario?.raiserPosition} in ${decision.position}`,
  };

  useEffect(() => {
    if (!showRange) return;
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowRange(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showRange]);

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

      {/* Show Range button for preflop decisions */}
      {preflopScenario && matrixData && (
        <button
          onClick={() => setShowRange(true)}
          className="mt-3 text-[10px] px-3 py-1.5 rounded-lg bg-gold/10 text-gold/70 border border-gold/15 hover:bg-gold/20 hover:text-gold transition-colors"
        >
          Show GTO Range
        </button>
      )}

      {/* Range modal */}
      {showRange && matrixData && preflopScenario && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowRange(false)}
        >
          <div
            className="relative bg-[#0d1210] rounded-2xl border border-gray-700/40 shadow-[0_0_60px_rgba(0,0,0,0.6)] p-5 sm:p-8 mx-4 max-w-lg w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRange(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors text-lg"
            >
              &times;
            </button>
            <div className="flex justify-center">
              <HandMatrix
                data={matrixData}
                scenarioLabel={scenarioLabels[preflopScenario.scenarioType]}
              />
            </div>
            {handNotation && (
              <p className="text-center text-xs text-gray-500 mt-3">
                Your hand: <span className="text-gold font-mono">{handNotation}</span>
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
