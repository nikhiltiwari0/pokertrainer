import { Position, ScenarioType, RANKS } from '@/types';
import { RangeAction } from '@/types/matrix';
import { getRFIRange } from './rfi';
import { getActionFacingRaise } from './facingRaise';
import { getActionFacingThreeBet } from './facingThreeBet';

// Generate all 169 canonical hand notations
function all169Hands(): string[] {
  const hands: string[] = [];
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      if (i === j) {
        hands.push(`${RANKS[i]}${RANKS[j]}`);
      } else if (i < j) {
        hands.push(`${RANKS[i]}${RANKS[j]}s`);
      } else {
        hands.push(`${RANKS[j]}${RANKS[i]}o`);
      }
    }
  }
  return hands;
}

export function getRangeForScenario(
  scenarioType: ScenarioType,
  heroPosition: Position,
  raiserPosition?: Position
): Map<string, RangeAction> {
  const rangeMap = new Map<string, RangeAction>();
  const hands = all169Hands();

  for (const hand of hands) {
    let action: RangeAction = 'fold';

    switch (scenarioType) {
      case 'RFI': {
        const rfiRange = getRFIRange(heroPosition);
        action = rfiRange.has(hand) ? 'raise' : 'fold';
        break;
      }
      case 'FACING_RAISE': {
        if (raiserPosition) {
          const result = getActionFacingRaise(hand, heroPosition, raiserPosition);
          action = result === 'raise' ? 'raise' : result === 'call' ? 'call' : 'fold';
        }
        break;
      }
      case 'FACING_3BET': {
        if (raiserPosition) {
          const result = getActionFacingThreeBet(hand, heroPosition, raiserPosition);
          action = result === 'raise' ? 'raise' : result === 'call' ? 'call' : 'fold';
        }
        break;
      }
    }

    rangeMap.set(hand, action);
  }

  return rangeMap;
}
