import { Scenario, PlayerAction, ActionResult } from '@/types';
import { isRFI } from '@/data/ranges/rfi';
import { getActionFacingRaise } from '@/data/ranges/facingRaise';
import { getActionFacingThreeBet } from '@/data/ranges/facingThreeBet';

export function checkAction(scenario: Scenario, playerAction: PlayerAction): ActionResult {
  const correctAction = getCorrectAction(scenario);
  const isCorrect = playerAction === correctAction;
  const explanation = buildExplanation(scenario, correctAction);

  return {
    playerAction,
    correctAction,
    isCorrect,
    explanation,
    scenario,
  };
}

function getCorrectAction(scenario: Scenario): PlayerAction {
  const { type, handNotation, playerPosition, raiserPosition } = scenario;

  switch (type) {
    case 'RFI':
      return isRFI(handNotation, playerPosition) ? 'raise' : 'fold';

    case 'FACING_RAISE':
      if (!raiserPosition) return 'fold';
      return getActionFacingRaise(handNotation, playerPosition, raiserPosition);

    case 'FACING_3BET':
      if (!raiserPosition) return 'fold';
      return getActionFacingThreeBet(handNotation, playerPosition, raiserPosition);

    default:
      return 'fold';
  }
}

function buildExplanation(scenario: Scenario, correctAction: PlayerAction): string {
  const { handNotation, playerPosition, type, raiserPosition } = scenario;

  const actionLabels: Record<string, Record<PlayerAction, string>> = {
    RFI: { raise: 'an open-raise', fold: 'a fold', call: 'a call' },
    FACING_RAISE: { raise: 'a 3-bet', fold: 'a fold', call: 'a call' },
    FACING_3BET: { raise: 'a 4-bet', fold: 'a fold', call: 'a call' },
  };

  const label = actionLabels[type][correctAction];

  if (type === 'RFI') {
    return `${handNotation} from ${playerPosition} is ${label} when folded to you.`;
  }

  if (type === 'FACING_RAISE') {
    return `${handNotation} in ${playerPosition} vs ${raiserPosition} open is ${label}.`;
  }

  return `${handNotation} in ${playerPosition} facing a 3-bet from ${raiserPosition} is ${label}.`;
}
