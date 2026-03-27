'use client';

import { Position, POSITION_ORDER, PriorAction } from '@/types';
import Seat from './Seat';

interface PokerTableProps {
  playerPosition: Position;
  priorActions: PriorAction[];
}

const SEAT_POSITIONS: Record<Position, { top: string; left: string }> = {
  UTG: { top: '18%', left: '88%' },
  HJ: { top: '78%', left: '88%' },
  CO: { top: '95%', left: '50%' },
  BTN: { top: '78%', left: '12%' },
  SB: { top: '18%', left: '12%' },
  BB: { top: '5%', left: '50%' },
};

export default function PokerTable({ playerPosition, priorActions }: PokerTableProps) {
  const actionMap = new Map(priorActions.map(a => [a.position, a.action]));

  return (
    <div className="relative w-full max-w-3xl mx-auto aspect-[2/1]">
      {/* Table felt */}
      <div className="absolute inset-4 sm:inset-6 rounded-[50%] bg-gradient-to-br from-felt to-felt-dark border-2 border-emerald-900/60 shadow-[inset_0_2px_30px_rgba(0,0,0,0.4),0_0_40px_rgba(26,92,58,0.1)]" />

      {/* Center label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-emerald-800/40 text-[10px] font-mono uppercase tracking-[0.3em]">6-max</span>
      </div>

      {/* Seats */}
      {POSITION_ORDER.map(pos => (
        <div
          key={pos}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: SEAT_POSITIONS[pos].top, left: SEAT_POSITIONS[pos].left }}
        >
          <Seat
            position={pos}
            isPlayer={pos === playerPosition}
            action={actionMap.get(pos)}
          />
        </div>
      ))}
    </div>
  );
}
