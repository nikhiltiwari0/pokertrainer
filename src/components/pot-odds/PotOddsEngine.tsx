'use client';

import { useState, useCallback } from 'react';
import { PotOddsScenario, PotOddsResult } from '@/types/potOdds';
import { generatePotOddsScenario, checkPotOdds } from '@/engine/potOddsChecker';
import CommunityCards from '@/components/cards/CommunityCards';
import HoleCards from '@/components/cards/HoleCards';

type Phase = 'idle' | 'playing' | 'feedback';

export default function PotOddsEngine() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scenario, setScenario] = useState<PotOddsScenario | null>(null);
  const [result, setResult] = useState<PotOddsResult | null>(null);
  const [totalHands, setTotalHands] = useState(0);
  const [correctHands, setCorrectHands] = useState(0);

  const startGame = useCallback(() => {
    setScenario(generatePotOddsScenario());
    setResult(null);
    setPhase('playing');
  }, []);

  const handleDecision = useCallback((decision: 'call' | 'fold') => {
    if (!scenario || phase !== 'playing') return;
    const res = checkPotOdds(scenario, decision);
    setResult(res);
    setTotalHands(prev => prev + 1);
    if (res.isCorrect) setCorrectHands(prev => prev + 1);
    setPhase('feedback');
  }, [scenario, phase]);

  const accuracy = totalHands > 0 ? Math.round((correctHands / totalHands) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 gap-6">
      {phase === 'idle' && (
        <div className="text-center space-y-8 animate-slide-up max-w-md">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl text-gray-50">Pot Odds & Equity</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Given a pot, a bet, and your draw — should you call or fold?
              Practice the math that makes you a winning player.
            </p>
          </div>
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-xl bg-gold/15 border border-gold/30 text-gold-bright font-display text-lg transition-all duration-300 hover:bg-gold/20 hover:border-gold/50 animate-glow-gold"
          >
            Start Drilling
          </button>
        </div>
      )}

      {phase !== 'idle' && scenario && (
        <div className="w-full max-w-2xl space-y-6 animate-fade-in">
          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>{totalHands} hands{totalHands > 0 ? ` — ${accuracy}%` : ''}</span>
            <span className="text-[10px] text-gray-600 bg-gray-800/40 px-2 py-1 rounded uppercase tracking-wider">{scenario.street}</span>
          </div>

          {/* Board */}
          <div className="space-y-2 text-center">
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Board</span>
            <div className="flex justify-center">
              <CommunityCards cards={scenario.board} />
            </div>
          </div>

          {/* Hole Cards */}
          <div className="space-y-2 text-center">
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Your Hand</span>
            <div className="flex justify-center">
              <HoleCards cards={scenario.holeCards} />
            </div>
          </div>

          {/* Pot info */}
          <div className="flex justify-center gap-4 sm:gap-6">
            <div className="bg-gray-900/40 rounded-xl px-5 py-3 border border-gray-800/50 text-center">
              <div className="text-[10px] text-gray-600 mb-1 uppercase tracking-wider">Pot</div>
              <div className="text-xl font-bold text-gray-200">{scenario.potSize} <span className="text-xs text-gray-500">BB</span></div>
            </div>
            <div className="bg-gray-900/40 rounded-xl px-5 py-3 border border-rose-800/30 text-center">
              <div className="text-[10px] text-gray-600 mb-1 uppercase tracking-wider">Bet</div>
              <div className="text-xl font-bold text-rose-400">{scenario.betSize} <span className="text-xs text-rose-400/50">BB</span></div>
            </div>
            <div className="bg-gray-900/40 rounded-xl px-5 py-3 border border-gold/20 text-center">
              <div className="text-[10px] text-gray-600 mb-1 uppercase tracking-wider">To Call</div>
              <div className="text-xl font-bold text-gold">{scenario.betSize} <span className="text-xs text-gold/50">BB</span></div>
            </div>
          </div>

          {/* Draw hint */}
          <p className="text-center text-gray-400 text-sm">
            You have a <span className="text-gray-200 font-medium">{scenario.drawDescription}</span>.
            Should you call or fold?
          </p>

          {/* Decision buttons */}
          {phase === 'playing' && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleDecision('fold')}
                className="px-8 py-4 rounded-xl bg-rose-600/80 hover:bg-rose-500/90 border border-rose-500/30 text-white font-semibold text-lg shadow-lg transition-all duration-200 hover:translate-y-[-1px] flex flex-col items-center"
              >
                Fold <span className="text-[10px] opacity-50 font-normal">(F)</span>
              </button>
              <button
                onClick={() => handleDecision('call')}
                className="px-8 py-4 rounded-xl bg-emerald-600/80 hover:bg-emerald-500/90 border border-emerald-500/30 text-white font-semibold text-lg shadow-lg transition-all duration-200 hover:translate-y-[-1px] flex flex-col items-center"
              >
                Call <span className="text-[10px] opacity-50 font-normal">(C)</span>
              </button>
            </div>
          )}

          {/* Feedback */}
          {phase === 'feedback' && result && (
            <div className={`
              animate-fade-in rounded-2xl p-5 text-center space-y-3
              ${result.isCorrect
                ? 'bg-emerald-950/40 border border-emerald-500/20'
                : 'bg-rose-950/40 border border-rose-500/20'
              }
            `}>
              <div className={`text-2xl font-display ${result.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                {result.isCorrect ? 'Correct' : 'Incorrect'}
              </div>

              <div className="text-sm text-gray-400 space-y-1.5">
                <p>
                  Pot odds: {scenario.betSize} / ({scenario.potSize} + {scenario.betSize} + {scenario.betSize})
                  = <span className="font-bold text-gold">{scenario.correctPotOdds}%</span>
                </p>
                <p>
                  Your equity: {scenario.outs} outs x {scenario.street === 'flop' ? '4' : '2'}
                  = <span className="font-bold text-blue-300">{scenario.equity}%</span>
                </p>
                <p className="pt-1 text-gray-300">
                  {scenario.equity >= scenario.correctPotOdds
                    ? `Equity (${scenario.equity}%) >= Pot Odds (${scenario.correctPotOdds}%) → Call`
                    : `Equity (${scenario.equity}%) < Pot Odds (${scenario.correctPotOdds}%) → Fold`
                  }
                </p>
              </div>

              <button
                onClick={startGame}
                className="px-5 py-2 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold text-sm font-medium transition-all duration-200 border border-gold/20"
              >
                Next Hand
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
