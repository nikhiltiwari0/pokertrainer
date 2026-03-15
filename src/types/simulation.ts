import { Card } from './card';
import { Position } from './scenario';
import { MadeHandType } from './handRecognition';

export type SimStreet = 'preflop' | 'flop' | 'turn' | 'river';
export type SimAction = 'fold' | 'check' | 'call' | 'bet' | 'raise';

export type SimPhase =
  | 'idle'
  | 'preflop'
  | 'flop'
  | 'turn'
  | 'river'
  | 'showdown'
  | 'review';

export interface BettingAction {
  playerId: number;
  position: Position;
  action: SimAction;
  amount: number;
  isHero: boolean;
  street: SimStreet;
  potAfter: number;
}

export interface SimPlayer {
  id: number;
  position: Position;
  holeCards: [Card, Card];
  stack: number;
  isHero: boolean;
  isFolded: boolean;
  isAllIn: boolean;
  totalInvested: number;
  currentBet: number;
}

export interface SimGameState {
  phase: SimPhase;
  handNumber: number;
  dealerSeatIndex: number;

  deck: Card[];
  players: SimPlayer[];
  communityCards: Card[];
  pot: number;

  currentStreet: SimStreet;
  currentPlayerIndex: number;
  highestBet: number;
  minRaise: number;
  lastRaiserIndex: number;
  actedThisRound: number[];

  actionHistory: BettingAction[];
  heroDecisionPoints: DecisionPoint[];

  deckIndex: number; // tracks where we are in the deck for dealing
}

export interface DecisionPoint {
  street: SimStreet;
  position: Position;
  holeCards: [Card, Card];
  communityCards: Card[];
  pot: number;
  heroStack: number;
  amountToCall: number;
  actionsBefore: BettingAction[];
  heroAction: SimAction;
  heroAmount: number;
  recommendedAction: SimAction;
  recommendedAmount: number;
  isCorrect: boolean;
  explanation: string;
  handStrength?: MadeHandType;
}

export interface ShowdownResult {
  winners: number[];
  winnerPositions: Position[];
  potAwarded: number;
  playerHands: Array<{
    playerId: number;
    position: Position;
    holeCards: [Card, Card];
    handType: MadeHandType;
    isFolded: boolean;
  }>;
  heroSurvived: boolean;
}

export interface HandReview {
  decisionPoints: DecisionPoint[];
  showdownResult: ShowdownResult | null;
  overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  correctCount: number;
  totalDecisions: number;
  summary: string;
  handNumber: number;
}

export interface AvailableAction {
  action: SimAction;
  minAmount?: number;
  maxAmount?: number;
}
