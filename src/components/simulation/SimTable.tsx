'use client';

import { SimGameState } from '@/types/simulation';
import SimSeat from './SimSeat';
import SimPotDisplay from './SimPotDisplay';
import SimCommunityCards from './SimCommunityCards';

interface SimTableProps {
  state: SimGameState;
  showAllCards?: boolean;
}

// 6-max table seat positions (absolute positioning within table)
const SEAT_POSITIONS: Record<number, { top: string; left: string }> = {
  0: { top: '82%', left: '25%' },  // Bottom-left
  1: { top: '82%', left: '75%' },  // Bottom-right
  2: { top: '45%', left: '95%' },  // Right
  3: { top: '8%', left: '75%' },   // Top-right
  4: { top: '8%', left: '25%' },   // Top-left
  5: { top: '45%', left: '5%' },   // Left
};

export default function SimTable({ state, showAllCards = false }: SimTableProps) {
  // Find hero and re-order seats so hero is always at bottom-center
  const heroIndex = state.players.findIndex(p => p.isHero);

  // Map each player to a visual seat position (hero at seat 0)
  const seatMapping = state.players.map((player, i) => {
    const visualSeat = (i - heroIndex + 6) % 6;
    return { player, visualSeat };
  });

  const dealerPlayer = state.players.find((_, i) => {
    // Dealer seat is tracked by index in state
    return i === state.dealerSeatIndex;
  });

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-[4/3]">
      {/* Table felt */}
      <div className="absolute inset-6 sm:inset-8 rounded-[50%] bg-gradient-to-br from-felt to-felt-dark border-2 border-emerald-900/60 shadow-[inset_0_2px_30px_rgba(0,0,0,0.4),0_0_40px_rgba(26,92,58,0.1)]" />

      {/* Community cards + pot in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <SimCommunityCards cards={state.communityCards} />
        <SimPotDisplay pot={state.pot} street={state.currentStreet} />
      </div>

      {/* Seats */}
      {seatMapping.map(({ player, visualSeat }) => {
        const pos = SEAT_POSITIONS[visualSeat];
        const isDealer = player.id === state.dealerSeatIndex;
        const isActive = player.id === state.currentPlayerIndex && state.phase !== 'showdown' && state.phase !== 'review';

        return (
          <div
            key={player.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: pos.top, left: pos.left }}
          >
            <SimSeat
              player={player}
              isDealer={isDealer}
              isActive={isActive}
              showCards={showAllCards}
            />
          </div>
        );
      })}
    </div>
  );
}
