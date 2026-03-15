'use client';

import { useState, useCallback, useEffect } from 'react';
import { HandRankingScenario, HandRankingResult } from '@/types/handRankingDrill';
import { generateHandRankingScenario, checkHandRanking, getHandLabel } from '@/engine/handRankingDrillChecker';
import CommunityCards from '@/components/cards/CommunityCards';
import HoleCards from '@/components/cards/HoleCards';

type Phase = 'idle' | 'playing' | 'feedback';

export default function HandRankingDrillEngine() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scenario, setScenario] = useState<HandRankingScenario | null>(null);
  const [result, setResult] = useState<HandRankingResult | null>(null);
  const [totalHands, setTotalHands] = useState(0);
  const [correctHands, setCorrectHands] = useState(0);

  const startGame = useCallback(() => {
    setScenario(generateHandRankingScenario());
    setResult(null);
    setPhase('playing');
  }, []);

  const handleAnswer = useCallback((answer: 'A' | 'B' | 'tie') => {
    if (!scenario || phase !== 'playing') return;
    const res = checkHandRanking(scenario, answer);
    setResult(res);
    setTotalHands(prev => prev + 1);
    if (res.isCorrect) setCorrectHands(prev => prev + 1);
    setPhase('feedback');
  }, [scenario, phase]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (phase === 'playing') {
        if (e.key === 'a' || e.key === 'A' || e.key === '1') handleAnswer('A');
        if (e.key === 't' || e.key === 'T' || e.key === '2') handleAnswer('tie');
        if (e.key === 'b' || e.key === 'B' || e.key === '3') handleAnswer('B');
      }
      if (phase === 'feedback' && e.key === ' ') {
        e.preventDefault();
        startGame();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, handleAnswer, startGame]);

  const accuracy = totalHands > 0 ? Math.round((correctHands / totalHands) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 gap-6">
      {phase === 'idle' && (
        <div className="text-center space-y-8 animate-slide-up max-w-md">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl text-gray-50">Hand Rankings</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Two players. One board. Which hand wins?
              Learn to compare poker hands at a glance.
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
          </div>

          {/* Board */}
          <div className="space-y-2 text-center">
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Board</span>
            <div className="flex justify-center">
              <CommunityCards cards={scenario.board} />
            </div>
          </div>

          {/* Two hands side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`
              text-center space-y-2 p-4 rounded-xl border transition-all
              ${result
                ? scenario.correctAnswer === 'A'
                  ? 'border-emerald-500/30 bg-emerald-950/20'
                  : scenario.correctAnswer === 'B'
                    ? 'border-gray-800/50 bg-gray-900/30'
                    : 'border-blue-500/30 bg-blue-950/20'
                : 'border-gray-800/50 bg-gray-900/30'
              }
            `}>
              <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Hand A</span>
              <div className="flex justify-center">
                <HoleCards cards={scenario.handA} />
              </div>
              {result && (
                <span className="text-xs text-gray-400 block">{getHandLabel(scenario.handAType)}</span>
              )}
            </div>

            <div className={`
              text-center space-y-2 p-4 rounded-xl border transition-all
              ${result
                ? scenario.correctAnswer === 'B'
                  ? 'border-emerald-500/30 bg-emerald-950/20'
                  : scenario.correctAnswer === 'A'
                    ? 'border-gray-800/50 bg-gray-900/30'
                    : 'border-blue-500/30 bg-blue-950/20'
                : 'border-gray-800/50 bg-gray-900/30'
              }
            `}>
              <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Hand B</span>
              <div className="flex justify-center">
                <HoleCards cards={scenario.handB} />
              </div>
              {result && (
                <span className="text-xs text-gray-400 block">{getHandLabel(scenario.handBType)}</span>
              )}
            </div>
          </div>

          {/* Answer buttons */}
          {phase === 'playing' && (
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleAnswer('A')}
                className="px-6 py-3 rounded-xl bg-blue-600/80 hover:bg-blue-500/90 border border-blue-500/30 text-white font-semibold shadow-lg transition-all duration-200 hover:translate-y-[-1px] flex flex-col items-center"
              >
                Hand A <span className="text-[10px] opacity-50 font-normal">(A)</span>
              </button>
              <button
                onClick={() => handleAnswer('tie')}
                className="px-6 py-3 rounded-xl bg-gray-600/80 hover:bg-gray-500/90 border border-gray-500/30 text-white font-semibold shadow-lg transition-all duration-200 hover:translate-y-[-1px] flex flex-col items-center"
              >
                Tie <span className="text-[10px] opacity-50 font-normal">(T)</span>
              </button>
              <button
                onClick={() => handleAnswer('B')}
                className="px-6 py-3 rounded-xl bg-amber-600/80 hover:bg-amber-500/90 border border-amber-500/30 text-white font-semibold shadow-lg transition-all duration-200 hover:translate-y-[-1px] flex flex-col items-center"
              >
                Hand B <span className="text-[10px] opacity-50 font-normal">(B)</span>
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

              <div className="text-sm text-gray-400 space-y-1">
                <p>
                  Hand A: <span className="text-gray-200">{getHandLabel(scenario.handAType)}</span>
                  {' — '}
                  Hand B: <span className="text-gray-200">{getHandLabel(scenario.handBType)}</span>
                </p>
                <p className="text-gray-300">
                  {scenario.correctAnswer === 'tie'
                    ? 'It\'s a tie — both hands are equal.'
                    : `Hand ${scenario.correctAnswer} wins.`
                  }
                </p>
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
