import { Position, ScenarioType } from './scenario';
import { HandNotation } from './hand';
import { HandCategory } from './hand';

export interface PositionStats {
  correct: number;
  total: number;
}

export interface StatsData {
  totalHands: number;
  totalCorrect: number;
  currentStreak: number;
  bestStreak: number;
  byPosition: Record<Position, PositionStats>;
  byScenarioType: Record<ScenarioType, PositionStats>;
  byHandCategory: Record<HandCategory, PositionStats>;
  recentResults: Array<{
    handNotation: HandNotation;
    position: Position;
    scenarioType: ScenarioType;
    isCorrect: boolean;
    timestamp: number;
  }>;
  lastUpdated: number;
}
