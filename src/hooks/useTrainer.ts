'use client';

import { useState, useCallback, useEffect } from 'react';
import { Scenario, PlayerAction, ActionResult } from '@/types';
import { generateScenario, ScenarioConfig } from '@/engine/scenarioGenerator';
import { checkAction } from '@/engine/actionChecker';
import { useStats } from './useStats';

export type TrainerPhase = 'idle' | 'awaiting_action' | 'showing_feedback';

interface TrainerState {
  phase: TrainerPhase;
  currentScenario: Scenario | null;
  lastResult: ActionResult | null;
  handsThisSession: number;
  correctThisSession: number;
}

export function useTrainer(config: ScenarioConfig) {
  const [state, setState] = useState<TrainerState>({
    phase: 'idle',
    currentScenario: null,
    lastResult: null,
    handsThisSession: 0,
    correctThisSession: 0,
  });

  const { stats, updateStats, resetStats } = useStats();

  const dealNextHand = useCallback(() => {
    const scenario = generateScenario(config);
    setState(prev => ({
      ...prev,
      phase: 'awaiting_action',
      currentScenario: scenario,
      lastResult: null,
    }));
  }, [config]);

  const submitAction = useCallback((action: PlayerAction) => {
    if (!state.currentScenario || state.phase !== 'awaiting_action') return;
    const result = checkAction(state.currentScenario, action);
    updateStats(result);
    setState(prev => ({
      ...prev,
      phase: 'showing_feedback',
      lastResult: result,
      handsThisSession: prev.handsThisSession + 1,
      correctThisSession: prev.correctThisSession + (result.isCorrect ? 1 : 0),
    }));
  }, [state.currentScenario, state.phase, updateStats]);

  const advance = useCallback(() => {
    dealNextHand();
  }, [dealNextHand]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (state.phase === 'awaiting_action' && state.currentScenario) {
        const available = state.currentScenario.availableActions;
        if ((e.key === 'f' || e.key === 'F') && available.includes('fold')) submitAction('fold');
        if ((e.key === 'c' || e.key === 'C') && available.includes('call')) submitAction('call');
        if ((e.key === 'r' || e.key === 'R') && available.includes('raise')) submitAction('raise');
      }
      if (state.phase === 'showing_feedback') {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          advance();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state.phase, state.currentScenario, submitAction, advance]);

  return { state, dealNextHand, submitAction, advance, stats, resetStats };
}
