export interface PositionDrillScenario {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'order' | 'classification' | 'strategy';
}

export interface PositionDrillResult {
  scenario: PositionDrillScenario;
  playerAnswerIndex: number;
  isCorrect: boolean;
}
