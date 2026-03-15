import { Card } from './card';
import { Position } from './scenario';

export type Street = 'flop' | 'turn' | 'river';
export type PostflopAction = 'fold' | 'check' | 'call' | 'bet' | 'raise';

export type PostflopConcept =
  | 'continuation-bet'
  | 'check-raise'
  | 'value-bet'
  | 'bluff'
  | 'pot-control'
  | 'fold-to-bet';

export const CONCEPT_LABELS: Record<PostflopConcept, string> = {
  'continuation-bet': 'Continuation Bet',
  'check-raise': 'Check-Raise',
  'value-bet': 'Value Bet',
  'bluff': 'Bluff',
  'pot-control': 'Pot Control',
  'fold-to-bet': 'Fold to Bet',
};

export const POSTFLOP_ACTION_LABELS: Record<PostflopAction, string> = {
  fold: 'Fold',
  check: 'Check',
  call: 'Call',
  bet: 'Bet',
  raise: 'Raise',
};

export interface PostflopScenario {
  id: string;
  street: Street;
  holeCards: [Card, Card];
  board: Card[];
  heroPosition: Position;
  villainPosition: Position;
  potSize: number;
  heroIsAggressor: boolean;
  villainAction: 'check' | 'bet';
  betSize?: number;
  availableActions: PostflopAction[];
  correctAction: PostflopAction;
  concept: PostflopConcept;
  explanation: string;
}

export interface PostflopResult {
  scenario: PostflopScenario;
  playerAction: PostflopAction;
  isCorrect: boolean;
}
