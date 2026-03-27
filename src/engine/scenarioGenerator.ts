import { Scenario, ScenarioType, Position, POSITION_ORDER, PriorAction, PlayerAction } from '@/types';
import { Card } from '@/types';
import { createDeck, shuffle } from './deck';
import { toHandNotation } from './handEvaluator';

export interface ScenarioConfig {
  allowedScenarioTypes: ScenarioType[];
  allowedPositions?: Position[];
}

export function generateScenario(config: ScenarioConfig): Scenario {
  const { allowedScenarioTypes, allowedPositions } = config;

  const type = pickRandom(allowedScenarioTypes);
  const validPositions = getValidPositions(type, allowedPositions);
  const playerPosition = pickRandom(validPositions);

  const { priorActions, raiserPosition } = buildPriorActions(type, playerPosition);

  const deck = shuffle(createDeck());
  const holeCards: [Card, Card] = [deck[0], deck[1]];
  const handNotation = toHandNotation(holeCards[0], holeCards[1]);

  const availableActions = getAvailableActions(type);

  return {
    id: Math.random().toString(36).slice(2),
    type,
    playerPosition,
    holeCards,
    handNotation,
    priorActions,
    raiserPosition,
    availableActions,
  };
}

function getValidPositions(type: ScenarioType, allowed?: Position[]): Position[] {
  let valid: Position[];

  switch (type) {
    case 'RFI':
      valid = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];
      break;
    case 'FACING_RAISE':
      valid = ['HJ', 'CO', 'BTN', 'SB', 'BB'];
      break;
    case 'FACING_3BET':
      valid = ['UTG', 'HJ', 'CO', 'BTN', 'SB'];
      break;
    default:
      valid = [...POSITION_ORDER];
  }

  if (allowed?.length) {
    valid = valid.filter(p => allowed.includes(p));
  }
  return valid;
}

function buildPriorActions(
  type: ScenarioType,
  playerPos: Position
): { priorActions: PriorAction[]; raiserPosition?: Position } {
  const posIndex = POSITION_ORDER.indexOf(playerPos);
  const priorActions: PriorAction[] = [];

  if (type === 'RFI') {
    for (let i = 0; i < posIndex; i++) {
      priorActions.push({ position: POSITION_ORDER[i], action: 'fold' });
    }
    return { priorActions };
  }

  if (type === 'FACING_RAISE') {
    const possibleRaisers = POSITION_ORDER.slice(0, posIndex);
    const raiserPosition = pickRandom(possibleRaisers);
    const raiserIdx = POSITION_ORDER.indexOf(raiserPosition);

    for (let i = 0; i < posIndex; i++) {
      if (i === raiserIdx) {
        priorActions.push({ position: POSITION_ORDER[i], action: 'raise' });
      } else {
        priorActions.push({ position: POSITION_ORDER[i], action: 'fold' });
      }
    }
    return { priorActions, raiserPosition };
  }

  if (type === 'FACING_3BET') {
    // Folds before hero
    for (let i = 0; i < posIndex; i++) {
      priorActions.push({ position: POSITION_ORDER[i], action: 'fold' });
    }
    // Hero's open raise is implicit
    // Pick a 3-bettor from after hero
    const possibleThreeBettors = POSITION_ORDER.slice(posIndex + 1);
    const threeBettorPos = pickRandom(possibleThreeBettors);
    const threeBettorIdx = POSITION_ORDER.indexOf(threeBettorPos);

    // Folds between hero and 3-bettor
    for (let i = posIndex + 1; i < threeBettorIdx; i++) {
      priorActions.push({ position: POSITION_ORDER[i], action: 'fold' });
    }
    priorActions.push({ position: threeBettorPos, action: '3bet' });

    return { priorActions, raiserPosition: threeBettorPos };
  }

  return { priorActions };
}

function getAvailableActions(type: ScenarioType): PlayerAction[] {
  switch (type) {
    case 'RFI':
      return ['fold', 'call', 'raise'];
    case 'FACING_RAISE':
      return ['fold', 'call', 'raise'];
    case 'FACING_3BET':
      return ['fold', 'call', 'raise'];
  }
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
