import type { Metadata } from 'next';
import SimulationEngine from '@/components/simulation/SimulationEngine';

export const metadata: Metadata = {
  title: 'Game Simulation',
  description: 'Play a full hand of 6-max No-Limit Hold\'em against AI opponents. Get a detailed review of every decision after the hand.',
  openGraph: {
    title: 'Game Simulation — Poker Trainer',
    description: 'Simulate real poker hands and review your play with AI-powered analysis.',
  },
};

export default function SimulationPage() {
  return <SimulationEngine />;
}
