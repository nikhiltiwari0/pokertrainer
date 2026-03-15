import { Card } from './card';
import { HandNotation } from './hand';
import { PlayerAction } from './action';

export type Position = 'UTG' | 'HJ' | 'CO' | 'BTN' | 'SB' | 'BB';

export const POSITION_ORDER: Position[] = ['UTG', 'HJ', 'CO', 'BTN', 'SB', 'BB'];

export type ScenarioType = 'RFI' | 'FACING_RAISE' | 'FACING_3BET';

export interface PriorAction {
  position: Position;
  action: 'fold' | 'raise' | 'call' | '3bet';
}

export interface Scenario {
  id: string;
  type: ScenarioType;
  playerPosition: Position;
  holeCards: [Card, Card];
  handNotation: HandNotation;
  priorActions: PriorAction[];
  raiserPosition?: Position;
  availableActions: PlayerAction[];
}
