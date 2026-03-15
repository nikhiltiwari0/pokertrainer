import { ComponentType } from 'react';
import HandRankingsChart from './HandRankingsChart';
import BettingRoundsFlow from './BettingRoundsFlow';
import PositionDiagram from './PositionDiagram';
import PotOddsVisual from './PotOddsVisual';

export const ILLUSTRATION_REGISTRY: Record<string, ComponentType> = {
  'hand-rankings-chart': HandRankingsChart,
  'betting-rounds-flow': BettingRoundsFlow,
  'position-diagram': PositionDiagram,
  'pot-odds-visual': PotOddsVisual,
};
