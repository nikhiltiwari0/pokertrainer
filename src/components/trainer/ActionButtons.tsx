'use client';

import { PlayerAction } from '@/types';

interface ActionButtonsProps {
  availableActions: PlayerAction[];
  onAction: (action: PlayerAction) => void;
  disabled: boolean;
}

const BUTTON_CONFIG: Record<PlayerAction, { label: string; key: string; colors: string }> = {
  fold: {
    label: 'Fold',
    key: 'F',
    colors: 'bg-rose-600/80 hover:bg-rose-500/90 active:bg-rose-700 border-rose-500/30',
  },
  call: {
    label: 'Call',
    key: 'C',
    colors: 'bg-blue-600/80 hover:bg-blue-500/90 active:bg-blue-700 border-blue-500/30',
  },
  raise: {
    label: 'Raise',
    key: 'R',
    colors: 'bg-emerald-600/80 hover:bg-emerald-500/90 active:bg-emerald-700 border-emerald-500/30',
  },
};

export default function ActionButtons({ availableActions, onAction, disabled }: ActionButtonsProps) {
  return (
    <div className="flex gap-3 sm:gap-4 justify-center animate-fade-in">
      {availableActions.map(action => {
        const config = BUTTON_CONFIG[action];
        return (
          <button
            key={action}
            onClick={() => onAction(action)}
            disabled={disabled}
            className={`
              ${config.colors}
              px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-semibold text-lg sm:text-xl text-white
              transition-all duration-200 border
              disabled:opacity-40 disabled:cursor-not-allowed
              shadow-lg hover:shadow-xl active:shadow-md
              hover:translate-y-[-1px] active:translate-y-[1px]
              flex flex-col items-center gap-0.5
            `}
          >
            <span>{config.label}</span>
            <span className="text-[10px] sm:text-xs opacity-50 font-normal">({config.key})</span>
          </button>
        );
      })}
    </div>
  );
}
