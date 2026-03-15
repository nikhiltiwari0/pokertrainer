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
      description = `Folded to you in ${playerPosition}. Open or fold?`;
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
    <div className="text-center space-y-1.5">
      <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-medium bg-gold/10 text-gold/80 border border-gold/15 tracking-wide uppercase">
        {typeLabels[type]}
      </span>
      <p className="text-gray-300 text-sm sm:text-base">{description}</p>
    </div>
  );
}
