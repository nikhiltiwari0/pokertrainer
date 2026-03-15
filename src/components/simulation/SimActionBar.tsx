'use client';

import { useState } from 'react';
import { AvailableAction, SimAction } from '@/types/simulation';

interface SimActionBarProps {
  actions: AvailableAction[];
  pot: number;
  onAction: (action: SimAction, amount: number) => void;
  disabled?: boolean;
}

export default function SimActionBar({ actions, pot, onAction, disabled = false }: SimActionBarProps) {
  const [raiseAmount, setRaiseAmount] = useState<number>(0);
  const [showRaiseSlider, setShowRaiseSlider] = useState(false);

  if (actions.length === 0 || disabled) return null;

  const foldAction = actions.find(a => a.action === 'fold');
  const checkAction = actions.find(a => a.action === 'check');
  const callAction = actions.find(a => a.action === 'call');
  const betAction = actions.find(a => a.action === 'bet');
  const raiseAction = actions.find(a => a.action === 'raise');

  const sizingAction = betAction || raiseAction;
  const minAmount = sizingAction?.minAmount || 0;
  const maxAmount = sizingAction?.maxAmount || 0;

  const handleSizingClick = () => {
    if (!sizingAction) return;
    if (minAmount === maxAmount) {
      // Only one amount possible (all-in)
      onAction(sizingAction.action, maxAmount);
      return;
    }
    setRaiseAmount(minAmount);
    setShowRaiseSlider(!showRaiseSlider);
  };

  const handlePresetSize = (fraction: number) => {
    if (!sizingAction) return;
    const size = Math.max(minAmount, Math.min(Math.round(pot * fraction), maxAmount));
    onAction(sizingAction.action, size);
    setShowRaiseSlider(false);
  };

  const handleConfirmRaise = () => {
    if (!sizingAction) return;
    onAction(sizingAction.action, raiseAmount);
    setShowRaiseSlider(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Preset sizes panel */}
      {showRaiseSlider && sizingAction && (
        <div className="flex items-center justify-center gap-2 mb-3 animate-fade-in">
          <button
            onClick={() => handlePresetSize(0.33)}
            className="px-3 py-1.5 text-xs font-medium bg-gray-800/60 text-gray-300 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 hover:text-white transition-colors"
          >
            1/3 pot
          </button>
          <button
            onClick={() => handlePresetSize(0.5)}
            className="px-3 py-1.5 text-xs font-medium bg-gray-800/60 text-gray-300 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 hover:text-white transition-colors"
          >
            1/2 pot
          </button>
          <button
            onClick={() => handlePresetSize(0.66)}
            className="px-3 py-1.5 text-xs font-medium bg-gray-800/60 text-gray-300 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 hover:text-white transition-colors"
          >
            2/3 pot
          </button>
          <button
            onClick={() => handlePresetSize(1)}
            className="px-3 py-1.5 text-xs font-medium bg-gray-800/60 text-gray-300 rounded-lg border border-gray-700/50 hover:bg-gray-700/60 hover:text-white transition-colors"
          >
            Pot
          </button>
          <button
            onClick={() => {
              if (sizingAction) onAction(sizingAction.action, maxAmount);
              setShowRaiseSlider(false);
            }}
            className="px-3 py-1.5 text-xs font-medium bg-rose-900/30 text-rose-300 rounded-lg border border-rose-800/40 hover:bg-rose-800/40 hover:text-rose-200 transition-colors"
          >
            All-in
          </button>
        </div>
      )}

      {/* Custom amount slider */}
      {showRaiseSlider && sizingAction && minAmount !== maxAmount && (
        <div className="flex items-center gap-3 mb-3 justify-center">
          <input
            type="range"
            min={minAmount}
            max={maxAmount}
            value={raiseAmount}
            onChange={(e) => setRaiseAmount(Number(e.target.value))}
            className="w-40 accent-gold"
          />
          <span className="text-sm font-mono text-gold min-w-[3rem] text-right">{raiseAmount}</span>
          <button
            onClick={handleConfirmRaise}
            className="px-3 py-1.5 text-xs font-bold bg-gold/20 text-gold rounded-lg border border-gold/30 hover:bg-gold/30 transition-colors"
          >
            Confirm
          </button>
        </div>
      )}

      {/* Main action buttons */}
      <div className="flex items-center justify-center gap-3">
        {foldAction && (
          <button
            onClick={() => onAction('fold', 0)}
            className="px-5 py-2.5 text-sm font-bold bg-gray-800/60 text-gray-400 rounded-xl border border-gray-700/50 hover:bg-gray-700/60 hover:text-gray-200 transition-all duration-200 hover:translate-y-[-1px]"
          >
            Fold
          </button>
        )}

        {checkAction && (
          <button
            onClick={() => onAction('check', 0)}
            className="px-5 py-2.5 text-sm font-bold bg-emerald-900/30 text-emerald-300 rounded-xl border border-emerald-800/40 hover:bg-emerald-800/40 hover:text-emerald-200 transition-all duration-200 hover:translate-y-[-1px]"
          >
            Check
          </button>
        )}

        {callAction && (
          <button
            onClick={() => onAction('call', callAction.minAmount || 0)}
            className="px-5 py-2.5 text-sm font-bold bg-emerald-900/30 text-emerald-300 rounded-xl border border-emerald-800/40 hover:bg-emerald-800/40 hover:text-emerald-200 transition-all duration-200 hover:translate-y-[-1px]"
          >
            Call {callAction.minAmount}
          </button>
        )}

        {sizingAction && (
          <button
            onClick={handleSizingClick}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl border transition-all duration-200 hover:translate-y-[-1px] ${
              showRaiseSlider
                ? 'bg-gold/20 text-gold border-gold/40'
                : 'bg-gold/10 text-gold border-gold/25 hover:bg-gold/20 hover:border-gold/40'
            }`}
          >
            {sizingAction.action === 'bet' ? 'Bet' : 'Raise'}
          </button>
        )}
      </div>
    </div>
  );
}
