'use client';

import { RANKS } from '@/types';
import { HandMatrixData, RangeAction } from '@/types/matrix';

interface HandMatrixProps {
  data: HandMatrixData;
  scenarioLabel?: string;
}

const ACTION_COLORS: Record<RangeAction, string> = {
  raise: 'bg-emerald-600/70 text-emerald-100',
  call: 'bg-blue-600/60 text-blue-100',
  fold: 'bg-gray-800/40 text-gray-600',
};

const HIGHLIGHT_RING = 'ring-2 ring-gold ring-offset-1 ring-offset-[#080c0a] z-10';

export default function HandMatrix({ data, scenarioLabel }: HandMatrixProps) {
  return (
    <div className="space-y-2.5">
      {scenarioLabel && (
        <div className="text-[10px] text-gray-500 text-center font-medium uppercase tracking-wider">{scenarioLabel}</div>
      )}

      <div className="inline-grid gap-px" style={{ gridTemplateColumns: `auto repeat(13, 1fr)` }}>
        <div />
        {RANKS.map(rank => (
          <div key={`col-${rank}`} className="text-[9px] sm:text-[10px] text-gray-600 text-center font-mono px-0.5">
            {rank}
          </div>
        ))}

        {data.map((row, rowIdx) => (
          <>
            <div key={`row-${rowIdx}`} className="text-[9px] sm:text-[10px] text-gray-600 font-mono flex items-center justify-center pr-0.5">
              {RANKS[rowIdx]}
            </div>
            {row.map(cell => (
              <div
                key={cell.notation}
                className={`
                  aspect-square w-6 sm:w-8 flex items-center justify-center
                  text-[8px] sm:text-[10px] font-mono rounded-sm
                  transition-all duration-100
                  ${ACTION_COLORS[cell.action]}
                  ${cell.isHighlighted ? HIGHLIGHT_RING : ''}
                `}
                title={`${cell.notation}: ${cell.action}`}
              >
                {cell.notation.replace('10', 'T')}
              </div>
            ))}
          </>
        ))}
      </div>

      <div className="flex gap-4 justify-center text-[10px] sm:text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-600/70" />
          <span>Raise</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-blue-600/60" />
          <span>Call</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-gray-800/40" />
          <span>Fold</span>
        </div>
      </div>
    </div>
  );
}
