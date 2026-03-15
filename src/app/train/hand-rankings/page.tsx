import type { Metadata } from 'next';
import HandRankingDrillEngine from '@/components/hand-ranking-drill/HandRankingDrillEngine';

export const metadata: Metadata = {
  title: 'Hand Rankings Drill',
  description: 'Compare two poker hands and pick the winner. Drill hand rankings until they\'re second nature.',
  openGraph: {
    title: 'Hand Rankings Drill — Poker Trainer',
    description: 'Compare two poker hands and pick the winner. Free hand ranking practice.',
  },
};

export default function HandRankingsDrillPage() {
  return <HandRankingDrillEngine />;
}
