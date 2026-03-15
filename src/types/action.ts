import { Scenario } from './scenario';

export type PlayerAction = 'fold' | 'call' | 'raise';

export interface ActionResult {
  playerAction: PlayerAction;
  correctAction: PlayerAction;
  isCorrect: boolean;
  explanation: string;
  scenario: Scenario;
}
