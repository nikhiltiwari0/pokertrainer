'use client';

import { useState, useCallback, useEffect } from 'react';
import { OutsEquityScenario, OutsEquityResult } from '@/types/outsEquity';
import { generateOutsEquityScenario, checkOutsEquity, getOutsExplanation } from '@/engine/outsEquityChecker';
import CommunityCards from '@/components/cards/CommunityCards';
import HoleCards from '@/components/cards/HoleCards';

type Phase = 'idle' | 'playing' | 'feedback';

export default function OutsEquityEngine() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scenario, setScenario] = useState<OutsEquityScenario | null>(null);
  const [result, setResult] = useState<OutsEquityResult | null>(null);
  const [totalHands, setTotalHands] = useState(0);
  const [correctHands, setCorrectHands] = useState(0);

  const startGame = useCallback(() => {
    setScenario(generateOutsEquityScenario());
    setResult(null);
    setPhase('playing');
  }, []);

  const handleAnswer = useCallback((index: number) => {
    if (!scenario || phase !== 'playing') return;
    const res = checkOutsEquity(scenario, index);
    setResult(res);
    setTotalHands(prev => prev + 1);
    if (res.isCorrect) setCorrectHands(prev => prev + 1);
    setPhase('feedback');
  }, [scenario, phase]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (phase === 'playing' && scenario) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= scenario.options.length) {
          handleAnswer(num - 1);
        }
      }
      if (phase === 'feedback' && e.key === ' ') {
        e.preventDefault();
        startGame();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, handleAnswer, startGame, scenario]);

  const accuracy = totalHands > 0 ? Math.round((correctHands / totalHands) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 gap-6">
      {phase === 'idle' && (
        <div className="text-center space-y-8 animate-slide-up max-w-md">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl text-gray-50">Outs & Equity</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              See a draw. Count the outs. Estimate the equity.
              Nail the math that wins you money.
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

          {/* Draw info */}
          <p className="text-center text-gray-400 text-sm">
            You have a <span className="text-gray-200 font-medium">{scenario.drawDescription}</span> on the <span className="text-gray-200 font-medium">{scenario.street}</span>.
          </p>

          {/* Question */}
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50 text-center">
            <p className="text-gray-100 text-lg">
              {scenario.questionType === 'outs'
                ? 'How many outs do you have?'
                : 'What is your approximate equity?'
              }
            </p>
          </div>

          {/* Options */}
          {phase === 'playing' && (
            <div className="flex gap-3 justify-center flex-wrap">
              {scenario.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="px-6 py-3.5 rounded-xl bg-gray-900/40 border border-gray-800/50 text-gray-200 hover:bg-gray-800/50 hover:border-gray-700/50 hover:text-white font-semibold text-lg transition-all duration-200 hover:translate-y-[-1px] min-w-[80px] flex flex-col items-center"
                >
                  {scenario.questionType === 'equity' ? `${opt}%` : opt}
                  <span className="text-[10px] opacity-40 font-normal">({i + 1})</span>
                </button>
              ))}
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
                {getOutsExplanation(scenario).split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <button
                onClick={startGame}
                className="px-5 py-2 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold text-sm font-medium transition-all duration-200 border border-gold/20"
              >
                Next Hand <span className="text-[10px] opacity-50">(Space)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
