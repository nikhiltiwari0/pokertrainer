import { Card } from './card';

export type OutsEquityQuestionType = 'outs' | 'equity';

export interface OutsEquityScenario {
  id: string;
  holeCards: [Card, Card];
  board: Card[];
  street: 'flop' | 'turn';
  drawDescription: string;
  correctOuts: number;
  correctEquity: number;
  questionType: OutsEquityQuestionType;
  options: number[];
  correctIndex: number;
}

export interface OutsEquityResult {
  scenario: OutsEquityScenario;
  playerAnswerIndex: number;
  isCorrect: boolean;
}
