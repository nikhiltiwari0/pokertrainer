'use client';

import { useState, useCallback, useEffect } from 'react';
import { PositionDrillScenario, PositionDrillResult } from '@/types/positionDrill';
import { generatePositionDrillScenario, checkPositionDrill } from '@/engine/positionDrillChecker';

type Phase = 'idle' | 'playing' | 'feedback';

const CATEGORY_LABELS: Record<string, string> = {
  order: 'Action Order',
  classification: 'Position Types',
  strategy: 'Strategy',
};

export default function PositionDrillEngine() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scenario, setScenario] = useState<PositionDrillScenario | null>(null);
  const [result, setResult] = useState<PositionDrillResult | null>(null);
  const [totalHands, setTotalHands] = useState(0);
  const [correctHands, setCorrectHands] = useState(0);

  const startGame = useCallback(() => {
    setScenario(generatePositionDrillScenario());
    setResult(null);
    setPhase('playing');
  }, []);

  const handleAnswer = useCallback((index: number) => {
    if (!scenario || phase !== 'playing') return;
    const res = checkPositionDrill(scenario, index);
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
            <h2 className="font-display text-3xl sm:text-4xl text-gray-50">Position Drill</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Test your understanding of table positions, action order,
              and position-based strategy.
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
        <div className="w-full max-w-xl space-y-6 animate-fade-in">
          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>{totalHands} questions{totalHands > 0 ? ` — ${accuracy}%` : ''}</span>
            <span className="text-[10px] text-gray-600 bg-gray-800/40 px-2 py-1 rounded uppercase tracking-wider">
              {CATEGORY_LABELS[scenario.category] ?? scenario.category}
            </span>
          </div>

          {/* Question */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50">
            <p className="text-gray-100 text-lg leading-relaxed">{scenario.question}</p>
          </div>

          {/* Options */}
          {phase === 'playing' && (
            <div className="grid grid-cols-1 gap-2.5">
              {scenario.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="text-left px-5 py-3.5 rounded-xl bg-gray-900/40 border border-gray-800/50 text-gray-300 hover:bg-gray-800/50 hover:border-gray-700/50 hover:text-white transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs text-gray-600 mr-3 font-mono">{i + 1}</span>
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Feedback */}
          {phase === 'feedback' && result && (
            <div className="space-y-3">
              {/* Show options with correct/incorrect highlighting */}
              <div className="grid grid-cols-1 gap-2">
                {scenario.options.map((option, i) => {
                  const isCorrect = i === scenario.correctIndex;
                  const isPlayerPick = i === result.playerAnswerIndex;
                  let style = 'border-gray-800/30 bg-gray-900/20 text-gray-600';
                  if (isCorrect) style = 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300';
                  if (isPlayerPick && !isCorrect) style = 'border-rose-500/30 bg-rose-950/30 text-rose-300';

                  return (
                    <div key={i} className={`px-5 py-3 rounded-xl border ${style} transition-all`}>
                      <span className="text-xs opacity-50 mr-3 font-mono">{i + 1}</span>
                      {option}
                      {isCorrect && <span className="ml-2 text-xs text-emerald-500">correct</span>}
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
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
                <p className="text-sm text-gray-400 leading-relaxed">{scenario.explanation}</p>
                <button
                  onClick={startGame}
                  className="px-5 py-2 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold text-sm font-medium transition-all duration-200 border border-gold/20"
                >
                  Next Question <span className="text-[10px] opacity-50">(Space)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
