import type { Metadata } from 'next';
import PositionDrillEngine from '@/components/position-drill/PositionDrillEngine';

export const metadata: Metadata = {
  title: 'Position Drill',
  description: 'Test your knowledge of table positions, action order, and position-based strategy in 6-max poker.',
  openGraph: {
    title: 'Position Drill — Poker Trainer',
    description: 'Master table positions and position-based strategy with interactive drills.',
  },
};

export default function PositionDrillPage() {
  return <PositionDrillEngine />;
}
