import { Card } from './card';

export type MadeHandType =
  | 'high-card'
  | 'pair'
  | 'two-pair'
  | 'three-of-a-kind'
  | 'straight'
  | 'flush'
  | 'full-house'
  | 'four-of-a-kind'
  | 'straight-flush';

export const MADE_HAND_LABELS: Record<MadeHandType, string> = {
  'high-card': 'High Card',
  'pair': 'Pair',
  'two-pair': 'Two Pair',
  'three-of-a-kind': 'Three of a Kind',
  'straight': 'Straight',
  'flush': 'Flush',
  'full-house': 'Full House',
  'four-of-a-kind': 'Four of a Kind',
  'straight-flush': 'Straight Flush',
};

export interface HandRecognitionScenario {
  id: string;
  holeCards: [Card, Card];
  board: Card[];
  correctAnswer: MadeHandType;
}

export interface HandRecognitionResult {
  scenario: HandRecognitionScenario;
  playerAnswer: MadeHandType;
  isCorrect: boolean;
  timeMs: number;
}
