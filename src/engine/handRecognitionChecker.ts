import { Card } from '@/types';
import { HandRecognitionScenario, HandRecognitionResult, MadeHandType } from '@/types/handRecognition';
import { createDeck, shuffle } from './deck';
import { evaluateHand } from './boardEvaluator';

// Weight distribution to avoid too many high-card scenarios
const TARGET_WEIGHTS: Partial<Record<MadeHandType, number>> = {
  'pair': 3,
  'two-pair': 3,
  'three-of-a-kind': 2,
  'straight': 2,
  'flush': 2,
  'full-house': 2,
  'high-card': 1,
  'four-of-a-kind': 1,
  'straight-flush': 1,
};

export function generateHandRecognitionScenario(): HandRecognitionScenario {
  // Generate several hands and pick one with good variety
  // Try up to 50 times to get a non-high-card hand (weighted)
  let bestScenario: HandRecognitionScenario | null = null;
  let bestWeight = 0;

  for (let attempt = 0; attempt < 50; attempt++) {
    const deck = shuffle(createDeck());
    const holeCards: [Card, Card] = [deck[0], deck[1]];
    const board = deck.slice(2, 7);

    const correctAnswer = evaluateHand(holeCards, board);
    const weight = TARGET_WEIGHTS[correctAnswer] ?? 1;

    const scenario: HandRecognitionScenario = {
      id: Math.random().toString(36).slice(2),
      holeCards,
      board,
      correctAnswer,
    };

    if (weight > bestWeight || (weight === bestWeight && Math.random() > 0.5)) {
      bestScenario = scenario;
      bestWeight = weight;
    }

    // If we found a good hand type, stop early
    if (weight >= 2) break;
  }

  return bestScenario!;
}

export function checkHandRecognition(
  scenario: HandRecognitionScenario,
  playerAnswer: MadeHandType,
  timeMs: number
): HandRecognitionResult {
  return {
    scenario,
    playerAnswer,
    isCorrect: playerAnswer === scenario.correctAnswer,
    timeMs,
  };
}
