'use client';

import { useState } from 'react';
import { ScenarioType } from '@/types';
import { useTrainer } from '@/hooks/useTrainer';
import HoleCards from '@/components/cards/HoleCards';
import PokerTable from '@/components/table/PokerTable';
import ActionButtons from './ActionButtons';
import FeedbackDisplay from './FeedbackDisplay';
import ScenarioInfo from './ScenarioInfo';
import StatsPanel from '@/components/stats/StatsPanel';

const ALL_SCENARIO_TYPES: ScenarioType[] = ['RFI', 'FACING_RAISE', 'FACING_3BET'];

export default function TrainerEngine() {
  const [scenarioTypes, setScenarioTypes] = useState<ScenarioType[]>(ALL_SCENARIO_TYPES);
  const [showStats, setShowStats] = useState(false);

  const { state, dealNextHand, submitAction, advance, stats, resetStats } = useTrainer({
    allowedScenarioTypes: scenarioTypes,
  });

  const toggleScenarioType = (type: ScenarioType) => {
    setScenarioTypes(prev => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  const accuracy = stats.totalHands > 0
    ? Math.round((stats.totalCorrect / stats.totalHands) * 100)
    : null;

  return (
    <div className="flex-1 flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-end px-5 py-2 gap-3">
        {stats.currentStreak > 0 && (
          <span className="text-sm text-gold font-medium">
            {stats.currentStreak} streak
          </span>
        )}
        <span className="text-sm text-gray-500">
          {accuracy !== null ? `${accuracy}%` : ''}
        </span>
        <button
          onClick={() => setShowStats(!showStats)}
          className="text-xs px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-gray-300 transition-colors border border-gray-800/50"
        >
          {showStats ? 'Hide Stats' : 'Stats'}
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main area */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 gap-6">
          {state.phase === 'idle' && (
            <div className="text-center space-y-8 animate-slide-up max-w-md">
              <div className="space-y-3">
                <h2 className="font-display text-3xl sm:text-4xl text-gray-50">Preflop Trainer</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Test your preflop decisions against GTO ranges.
                  Choose your scenario types and start drilling.
                </p>
              </div>

              {/* Scenario type toggles */}
              <div className="flex flex-wrap gap-2 justify-center">
                {ALL_SCENARIO_TYPES.map(type => {
                  const labels: Record<ScenarioType, string> = {
                    RFI: 'Raise First In',
                    FACING_RAISE: 'Facing Raise',
                    FACING_3BET: 'Facing 3-Bet',
                  };
                  const active = scenarioTypes.includes(type);
                  return (
                    <button
                      key={type}
                      onClick={() => toggleScenarioType(type)}
                      className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                        ${active
                          ? 'bg-gold/15 text-gold border-gold/25'
                          : 'bg-gray-900/50 text-gray-500 border-gray-800 hover:text-gray-300 hover:border-gray-700'
                        }
                      `}
                    >
                      {labels[type]}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={dealNextHand}
                className="px-8 py-4 rounded-xl bg-gold/15 border border-gold/30 text-gold-bright font-display text-lg transition-all duration-300 hover:bg-gold/20 hover:border-gold/50 animate-glow-gold"
              >
                Deal First Hand
              </button>
            </div>
          )}

          {state.phase !== 'idle' && state.currentScenario && (
            <div className="w-full max-w-2xl space-y-5 animate-fade-in">
              <ScenarioInfo scenario={state.currentScenario} />

              <PokerTable
                playerPosition={state.currentScenario.playerPosition}
                priorActions={state.currentScenario.priorActions}
              />

              <div className="flex justify-center">
                <HoleCards cards={state.currentScenario.holeCards} />
              </div>

              <div className="text-center">
                <span className="text-gray-500 text-sm font-mono tracking-wider">
                  {state.currentScenario.handNotation}
                </span>
              </div>

              {state.phase === 'awaiting_action' && (
                <ActionButtons
                  availableActions={state.currentScenario.availableActions}
                  onAction={submitAction}
                  disabled={false}
                />
              )}

              {state.phase === 'showing_feedback' && state.lastResult && (
                <FeedbackDisplay result={state.lastResult} onNext={advance} />
              )}
            </div>
          )}
        </div>

        {/* Stats sidebar */}
        {showStats && (
          <div className="lg:w-80 p-4 border-t lg:border-t-0 lg:border-l border-gray-800/50">
            <StatsPanel
              stats={stats}
              sessionHands={state.handsThisSession}
              sessionCorrect={state.correctThisSession}
              onReset={resetStats}
            />
          </div>
        )}
      </div>
    </div>
  );
}
