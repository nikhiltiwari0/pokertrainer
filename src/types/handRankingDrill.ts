import { Card } from './card';
import { MadeHandType } from './handRecognition';

export interface HandRankingScenario {
  id: string;
  handA: [Card, Card];
  handB: [Card, Card];
  board: Card[];
  correctAnswer: 'A' | 'B' | 'tie';
  handAType: MadeHandType;
  handBType: MadeHandType;
}

export interface HandRankingResult {
  scenario: HandRankingScenario;
  playerAnswer: 'A' | 'B' | 'tie';
  isCorrect: boolean;
}
