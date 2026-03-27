'use client';

import { Scenario } from '@/types';

interface ScenarioInfoProps {
  scenario: Scenario;
}

export default function ScenarioInfo({ scenario }: ScenarioInfoProps) {
  const { type, playerPosition, raiserPosition } = scenario;

  let description = '';
  switch (type) {
    case 'RFI':
      description = playerPosition === 'UTG'
        ? `You're first to act in ${playerPosition}. Open or fold?`
        : `Folded to you in ${playerPosition}. Open or fold?`;
      break;
    case 'FACING_RAISE':
      description = `${raiserPosition} raises. Action on you in ${playerPosition}.`;
      break;
    case 'FACING_3BET':
      description = `You opened from ${playerPosition}. ${raiserPosition} 3-bets. What do you do?`;
      break;
  }

  const typeLabels: Record<string, string> = {
    RFI: 'Raise First In',
    FACING_RAISE: 'Facing Raise',
    FACING_3BET: 'Facing 3-Bet',
  };

  return (
    <div className="space-y-1.5">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold/80 border border-gold/15 tracking-wide uppercase">
        {typeLabels[type]}
      </span>
      <p className="text-gray-200 text-base sm:text-lg font-medium">{description}</p>
    </div>
  );
}
