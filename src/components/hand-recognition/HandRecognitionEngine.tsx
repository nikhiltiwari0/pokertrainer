'use client';

import { useState, useCallback, useEffect } from 'react';
import { MadeHandType, MADE_HAND_LABELS, HandRecognitionResult } from '@/types/handRecognition';
import { generateHandRecognitionScenario, checkHandRecognition } from '@/engine/handRecognitionChecker';
import CommunityCards from '@/components/cards/CommunityCards';
import HoleCards from '@/components/cards/HoleCards';

type Phase = 'idle' | 'playing' | 'feedback';

const HAND_TYPES: MadeHandType[] = [
  'high-card', 'pair', 'two-pair', 'three-of-a-kind',
  'straight', 'flush', 'full-house', 'four-of-a-kind', 'straight-flush',
];

const TYPE_COLORS: Record<MadeHandType, string> = {
  'high-card': 'bg-gray-800/60 hover:bg-gray-700/60 border-gray-700/40',
  'pair': 'bg-gray-800/60 hover:bg-gray-700/60 border-gray-700/40',
  'two-pair': 'bg-blue-900/30 hover:bg-blue-800/40 border-blue-700/30',
  'three-of-a-kind': 'bg-blue-900/30 hover:bg-blue-800/40 border-blue-700/30',
  'straight': 'bg-purple-900/30 hover:bg-purple-800/40 border-purple-700/30',
  'flush': 'bg-purple-900/30 hover:bg-purple-800/40 border-purple-700/30',
  'full-house': 'bg-gold/10 hover:bg-gold/15 border-gold/20',
  'four-of-a-kind': 'bg-gold/10 hover:bg-gold/15 border-gold/20',
  'straight-flush': 'bg-rose-900/30 hover:bg-rose-800/40 border-rose-700/30',
};

export default function HandRecognitionEngine() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scenario, setScenario] = useState(generateHandRecognitionScenario());
  const [result, setResult] = useState<HandRecognitionResult | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [totalHands, setTotalHands] = useState(0);
  const [correctHands, setCorrectHands] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);
    return () => clearInterval(interval);
  }, [phase, startTime]);

  const startGame = useCallback(() => {
    const newScenario = generateHandRecognitionScenario();
    setScenario(newScenario);
    setResult(null);
    setStartTime(Date.now());
    setElapsed(0);
    setPhase('playing');
  }, []);

  const handleAnswer = useCallback((answer: MadeHandType) => {
    if (phase !== 'playing') return;
    const timeMs = Date.now() - startTime;
    const res = checkHandRecognition(scenario, answer, timeMs);
    setResult(res);
    setTotalHands(prev => prev + 1);
    if (res.isCorrect) {
      setCorrectHands(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
    setPhase('feedback');
  }, [phase, scenario, startTime]);

  const formatTime = (ms: number) => {
    const seconds = (ms / 1000).toFixed(1);
    return `${seconds}s`;
  };

  const accuracy = totalHands > 0 ? Math.round((correctHands / totalHands) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 gap-6">
      {phase === 'idle' && (
        <div className="text-center space-y-8 animate-slide-up max-w-md">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl text-gray-50">Hand Recognition</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              See a board and hole cards, then quickly identify what hand you have.
              Speed and accuracy both matter.
            </p>
          </div>
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-xl bg-gold/15 border border-gold/30 text-gold-bright font-display text-lg transition-all duration-300 hover:bg-gold/20 hover:border-gold/50 animate-glow-gold"
          >
            Start Quiz
          </button>
        </div>
      )}

      {phase !== 'idle' && (
        <div className="w-full max-w-2xl space-y-6 animate-fade-in">
          {/* Stats bar */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex gap-4">
              <span>{totalHands} hands</span>
              {totalHands > 0 && <span>{accuracy}%</span>}
              {streak > 0 && <span className="text-gold">{streak} streak</span>}
            </div>
            <div className={`font-mono tabular-nums ${elapsed > 10000 ? 'text-rose-400' : elapsed > 5000 ? 'text-gold' : 'text-gray-500'}`}>
              {formatTime(elapsed)}
            </div>
          </div>

          {/* Board */}
          <div className="space-y-2 text-center">
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Board</span>
            <div className="flex justify-center">
              <CommunityCards cards={scenario.board} />
            </div>
          </div>

          {/* Hole cards */}
          <div className="space-y-2 text-center">
            <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Your Hand</span>
            <div className="flex justify-center">
              <HoleCards cards={scenario.holeCards} />
            </div>
          </div>

          {/* Answer buttons */}
          {phase === 'playing' && (
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {HAND_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => handleAnswer(type)}
                  className={`
                    px-2 py-3 rounded-lg text-xs sm:text-sm font-medium
                    transition-all duration-200 text-gray-300 border
                    hover:translate-y-[-1px]
                    ${TYPE_COLORS[type]}
                  `}
                >
                  {MADE_HAND_LABELS[type]}
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
              {!result.isCorrect && (
                <p className="text-gray-400 text-sm">
                  You said <span className="text-rose-300 font-semibold">{MADE_HAND_LABELS[result.playerAnswer]}</span>
                  {' — it was '}
                  <span className="text-emerald-300 font-semibold">{MADE_HAND_LABELS[result.scenario.correctAnswer]}</span>
                </p>
              )}
              <p className="text-gray-600 text-xs">Time: {formatTime(result.timeMs)}</p>
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
