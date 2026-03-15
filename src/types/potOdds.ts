import { Card } from './card';

export interface PotOddsScenario {
  id: string;
  holeCards: [Card, Card];
  board: Card[];
  potSize: number;
  betSize: number;
  correctPotOdds: number;  // percentage (0-100)
  outs: number;
  equity: number;          // percentage (0-100)
  correctDecision: 'call' | 'fold';
  street: 'flop' | 'turn';
  drawDescription: string;
}

export interface PotOddsResult {
  scenario: PotOddsScenario;
  playerDecision: 'call' | 'fold';
  isCorrect: boolean;
}
