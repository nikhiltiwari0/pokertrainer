'use client';

import { useCallback } from 'react';
import { StatsData, PositionStats } from '@/types';
import { ActionResult } from '@/types';
import { Position, ScenarioType } from '@/types';
import { HandCategory } from '@/types';
import { getHandCategory } from '@/engine/handEvaluator';
import { useLocalStorage } from './useLocalStorage';

const STATS_KEY = 'poker-trainer-stats';

const emptyPositionStats = (): PositionStats => ({ correct: 0, total: 0 });

function defaultStats(): StatsData {
  return {
    totalHands: 0,
    totalCorrect: 0,
    currentStreak: 0,
    bestStreak: 0,
    byPosition: {
      UTG: emptyPositionStats(),
      HJ: emptyPositionStats(),
      CO: emptyPositionStats(),
      BTN: emptyPositionStats(),
      SB: emptyPositionStats(),
      BB: emptyPositionStats(),
    },
    byScenarioType: {
      RFI: emptyPositionStats(),
      FACING_RAISE: emptyPositionStats(),
      FACING_3BET: emptyPositionStats(),
    },
    byHandCategory: {
      pair: emptyPositionStats(),
      suited: emptyPositionStats(),
      offsuit: emptyPositionStats(),
    },
    recentResults: [],
    lastUpdated: Date.now(),
  };
}

export function useStats() {
  const [stats, setStats] = useLocalStorage<StatsData>(STATS_KEY, defaultStats());

  const updateStats = useCallback((result: ActionResult) => {
    setStats(prev => {
      const next = structuredClone(prev);
      next.totalHands++;

      if (result.isCorrect) {
        next.totalCorrect++;
        next.currentStreak++;
        next.bestStreak = Math.max(next.bestStreak, next.currentStreak);
      } else {
        next.currentStreak = 0;
      }

      const pos: Position = result.scenario.playerPosition;
      next.byPosition[pos].total++;
      if (result.isCorrect) next.byPosition[pos].correct++;

      const scenType: ScenarioType = result.scenario.type;
      next.byScenarioType[scenType].total++;
      if (result.isCorrect) next.byScenarioType[scenType].correct++;

      const handCat: HandCategory = getHandCategory(result.scenario.handNotation);
      next.byHandCategory[handCat].total++;
      if (result.isCorrect) next.byHandCategory[handCat].correct++;

      next.recentResults = [
        {
          handNotation: result.scenario.handNotation,
          position: result.scenario.playerPosition,
          scenarioType: result.scenario.type,
          isCorrect: result.isCorrect,
          timestamp: Date.now(),
        },
        ...prev.recentResults,
      ].slice(0, 100);

      next.lastUpdated = Date.now();
      return next;
    });
  }, [setStats]);

  const resetStats = useCallback(() => setStats(defaultStats()), [setStats]);

  return { stats, updateStats, resetStats };
}
