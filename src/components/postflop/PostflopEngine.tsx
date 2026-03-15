'use client';

import { useState, useCallback, useEffect } from 'react';
import { PostflopScenario, PostflopAction, PostflopResult, POSTFLOP_ACTION_LABELS, CONCEPT_LABELS } from '@/types/postflop';
import { POSTFLOP_SCENARIOS } from '@/data/postflop/postflopScenarios';
import CommunityCards from '@/components/cards/CommunityCards';
import HoleCards from '@/components/cards/HoleCards';

type Phase = 'idle' | 'playing' | 'feedback';

const ACTION_COLORS: Record<PostflopAction, string> = {
  fold: 'bg-rose-600/80 hover:bg-rose-500/90 border-rose-500/30',
  check: 'bg-gray-700/60 hover:bg-gray-600/70 border-gray-600/30',
  call: 'bg-blue-600/80 hover:bg-blue-500/90 border-blue-500/30',
  bet: 'bg-emerald-600/80 hover:bg-emerald-500/90 border-emerald-500/30',
  raise: 'bg-emerald-600/80 hover:bg-emerald-500/90 border-emerald-500/30',
};

const ACTION_KEYS: Record<string, PostflopAction> = {
  f: 'fold', F: 'fold',
  x: 'check', X: 'check',
  c: 'call', C: 'call',
  b: 'bet', B: 'bet',
  r: 'raise', R: 'raise',
};

const KEY_HINTS: Record<PostflopAction, string> = {
  fold: 'F', check: 'X', call: 'C', bet: 'B', raise: 'R',
};

function pickRandom(): PostflopScenario {
  return POSTFLOP_SCENARIOS[Math.floor(Math.random() * POSTFLOP_SCENARIOS.length)];
}

export default function PostflopEngine() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scenario, setScenario] = useState<PostflopScenario | null>(null);
  const [result, setResult] = useState<PostflopResult | null>(null);
  const [totalHands, setTotalHands] = useState(0);
  const [correctHands, setCorrectHands] = useState(0);

  const startGame = useCallback(() => {
    setScenario(pickRandom());
    setResult(null);
    setPhase('playing');
  }, []);

  const handleAction = useCallback((action: PostflopAction) => {
    if (!scenario || phase !== 'playing') return;
    const res: PostflopResult = {
      scenario,
      playerAction: action,
      isCorrect: action === scenario.correctAction,
    };
    setResult(res);
    setTotalHands(prev => prev + 1);
    if (res.isCorrect) setCorrectHands(prev => prev + 1);
    setPhase('feedback');
  }, [scenario, phase]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (phase === 'playing' && scenario) {
        const action = ACTION_KEYS[e.key];
        if (action && scenario.availableActions.includes(action)) {
          handleAction(action);
        }
      }
      if (phase === 'feedback' && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        startGame();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, scenario, handleAction, startGame]);

  const accuracy = totalHands > 0 ? Math.round((correctHands / totalHands) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 gap-6">
      {phase === 'idle' && (
        <div className="text-center space-y-8 animate-slide-up max-w-md">
          <div className="space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl text-gray-50">Postflop Trainer</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Practice postflop decisions — c-bets, value bets, bluffs, and pot control.
              Each scenario teaches a key concept.
            </p>
          </div>
          <button
            onClick={startGame}
            className="px-8 py-4 rounded-xl bg-gold/15 border border-gold/30 text-gold-bright font-display text-lg transition-all duration-300 hover:bg-gold/20 hover:border-gold/50 animate-glow-gold"
          >
            Start Training
          </button>
        </div>
      )}

      {phase !== 'idle' && scenario && (
        <div className="w-full max-w-2xl space-y-5 animate-fade-in">
          {/* Stats */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>{totalHands} hands{totalHands > 0 ? ` — ${accuracy}%` : ''}</span>
            <span className="text-[10px] text-gray-600 bg-gray-800/40 px-2 py-1 rounded uppercase tracking-wider">{scenario.street}</span>
          </div>

          {/* Scenario context */}
          <div className="text-center space-y-1.5">
            <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-medium bg-gold/10 text-gold/80 border border-gold/15 tracking-wide uppercase">
              {CONCEPT_LABELS[scenario.concept]}
            </span>
            <p className="text-gray-300 text-sm">
              You{scenario.heroIsAggressor ? ' raised preflop from' : '\'re in'} {scenario.heroPosition}.
              {' '}Villain is in {scenario.villainPosition}.
              {scenario.villainAction === 'bet' && scenario.betSize
                ? ` Villain bets ${scenario.betSize} BB into a ${scenario.potSize} BB pot.`
                : ` Villain checks. Pot is ${scenario.potSize} BB.`
              }
            </p>
          </div>

          {/* Board */}
          <div className="flex justify-center">
            <CommunityCards cards={scenario.board} />
          </div>

          {/* Hole cards */}
          <div className="flex justify-center">
            <HoleCards cards={scenario.holeCards} />
          </div>

          {/* Action buttons */}
          {phase === 'playing' && (
            <div className="flex gap-3 justify-center flex-wrap">
              {scenario.availableActions.map(action => (
                <button
                  key={action}
                  onClick={() => handleAction(action)}
                  className={`
                    px-6 py-3 rounded-xl font-semibold text-base text-white border
                    transition-all duration-200 shadow-lg flex flex-col items-center gap-0.5
                    hover:translate-y-[-1px]
                    ${ACTION_COLORS[action]}
                  `}
                >
                  <span>{POSTFLOP_ACTION_LABELS[action]}</span>
                  <span className="text-[10px] opacity-50 font-normal">({KEY_HINTS[action]})</span>
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
                  You chose <span className="text-rose-300 font-semibold">{POSTFLOP_ACTION_LABELS[result.playerAction]}</span>
                  {' — correct play is '}
                  <span className="text-emerald-300 font-semibold">{POSTFLOP_ACTION_LABELS[scenario.correctAction]}</span>
                </p>
              )}
              <p className="text-gray-500 text-sm leading-relaxed">{scenario.explanation}</p>
              <button
                onClick={startGame}
                className="px-5 py-2 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold text-sm font-medium transition-all duration-200 border border-gold/20"
              >
                Next Hand <span className="opacity-40 text-xs ml-1">(Space)</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
