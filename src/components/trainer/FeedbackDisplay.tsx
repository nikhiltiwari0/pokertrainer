'use client';

import { useState } from 'react';
import { ActionResult } from '@/types';
import { generateMatrix } from '@/engine/matrixGenerator';
import HandMatrix from '@/components/range/HandMatrix';

interface FeedbackDisplayProps {
  result: ActionResult;
  onNext: () => void;
}

const ACTION_LABELS: Record<string, Record<string, string>> = {
  RFI: { raise: 'Open Raise', fold: 'Fold', call: 'Call' },
  FACING_RAISE: { raise: '3-Bet', fold: 'Fold', call: 'Call' },
  FACING_3BET: { raise: '4-Bet', fold: 'Fold', call: 'Call' },
};

function getScenarioLabel(result: ActionResult): string {
  const { scenario } = result;
  const { type, playerPosition, raiserPosition } = scenario;
  switch (type) {
    case 'RFI':
      return `RFI from ${playerPosition}`;
    case 'FACING_RAISE':
      return `${playerPosition} vs ${raiserPosition} open`;
    case 'FACING_3BET':
      return `${playerPosition} facing 3-bet from ${raiserPosition}`;
    default:
      return '';
  }
}

export default function FeedbackDisplay({ result, onNext }: FeedbackDisplayProps) {
  const [showRange, setShowRange] = useState(false);
  const { isCorrect, correctAction, playerAction, explanation, scenario } = result;
  const labels = ACTION_LABELS[scenario.type];

  const matrixData = showRange
    ? generateMatrix(scenario.type, scenario.playerPosition, scenario.raiserPosition, scenario.handNotation)
    : null;

  return (
    <div className="animate-fade-in space-y-4 max-w-lg mx-auto">
      <div
        className={`
          rounded-2xl p-5 sm:p-6 text-center
          ${isCorrect
            ? 'bg-emerald-950/40 border border-emerald-500/20 animate-pulse-correct'
            : 'bg-rose-950/40 border border-rose-500/20 animate-pulse-incorrect'
          }
        `}
      >
        <div className={`text-3xl sm:text-4xl mb-2 font-display ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </div>

        {!isCorrect && (
          <p className="text-gray-400 text-sm mb-3">
            You chose <span className="font-semibold text-rose-300">{labels[playerAction]}</span>
            {' — correct play is '}
            <span className="font-semibold text-emerald-300">{labels[correctAction]}</span>
          </p>
        )}

        <p className="text-gray-500 text-sm mb-5 leading-relaxed">{explanation}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setShowRange(!showRange)}
            className="px-4 py-2 rounded-lg bg-gray-800/60 hover:bg-gray-800 text-sm font-medium transition-all duration-200 border border-gray-700/50 text-gray-400 hover:text-gray-300"
          >
            {showRange ? 'Hide Range' : 'Show Range'}
          </button>
          <button
            onClick={onNext}
            className="px-5 py-2 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold text-sm font-medium transition-all duration-200 border border-gold/20"
          >
            Next Hand <span className="opacity-40 text-xs ml-1">(Space)</span>
          </button>
        </div>
      </div>

      {showRange && matrixData && (
        <div className="animate-scale-in flex justify-center bg-gray-900/40 rounded-xl p-3 sm:p-4 border border-gray-800/50">
          <HandMatrix data={matrixData} scenarioLabel={getScenarioLabel(result)} />
        </div>
      )}
    </div>
  );
}
