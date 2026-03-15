'use client';

import { StatsData, POSITION_ORDER } from '@/types';

interface StatsPanelProps {
  stats: StatsData;
  sessionHands: number;
  sessionCorrect: number;
  onReset: () => void;
}

export default function StatsPanel({ stats, sessionHands, sessionCorrect, onReset }: StatsPanelProps) {
  const accuracy = stats.totalHands > 0 ? Math.round((stats.totalCorrect / stats.totalHands) * 100) : 0;
  const sessionAccuracy = sessionHands > 0 ? Math.round((sessionCorrect / sessionHands) * 100) : 0;

  return (
    <div className="bg-gray-900/40 border border-gray-800/50 rounded-2xl p-4 sm:p-5 space-y-4 max-w-sm w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-gray-200">Stats</h3>
        <button
          onClick={onReset}
          className="text-xs text-gray-600 hover:text-rose-400 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-xl sm:text-2xl font-bold text-gray-100">{stats.totalHands}</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Total</div>
        </div>
        <div>
          <div className={`text-xl sm:text-2xl font-bold ${accuracy >= 70 ? 'text-emerald-400' : accuracy >= 50 ? 'text-gold' : 'text-rose-400'}`}>
            {accuracy}%
          </div>
          <div className="text-[10px] sm:text-xs text-gray-600">Accuracy</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-gold">{stats.bestStreak}</div>
          <div className="text-[10px] sm:text-xs text-gray-600">Best Streak</div>
        </div>
      </div>

      {sessionHands > 0 && (
        <div className="pt-3 border-t border-gray-800/50">
          <div className="text-[10px] text-gray-600 mb-2 uppercase tracking-wider">This Session</div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{sessionHands} hands</span>
            <span className={sessionAccuracy >= 70 ? 'text-emerald-400' : sessionAccuracy >= 50 ? 'text-gold' : 'text-rose-400'}>
              {sessionAccuracy}%
            </span>
          </div>
        </div>
      )}

      {stats.currentStreak > 0 && (
        <div className="pt-3 border-t border-gray-800/50">
          <div className="flex items-center gap-2">
            <span className="text-gold text-sm">&#9733;</span>
            <span className="text-sm text-gray-400">{stats.currentStreak} in a row</span>
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-gray-800/50">
        <div className="text-[10px] text-gray-600 mb-2 uppercase tracking-wider">By Position</div>
        <div className="space-y-1.5">
          {POSITION_ORDER.map(pos => {
            const p = stats.byPosition[pos];
            const pct = p.total > 0 ? Math.round((p.correct / p.total) * 100) : 0;
            return (
              <div key={pos} className="flex items-center gap-2 text-xs">
                <span className="w-8 text-gray-500 font-mono">{pos}</span>
                <div className="flex-1 h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${pct >= 70 ? 'bg-emerald-500/80' : pct >= 50 ? 'bg-gold/80' : 'bg-rose-500/80'}`}
                    style={{ width: p.total > 0 ? `${pct}%` : '0%' }}
                  />
                </div>
                <span className="w-10 text-right text-gray-600 tabular-nums">
                  {p.total > 0 ? `${pct}%` : '—'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
