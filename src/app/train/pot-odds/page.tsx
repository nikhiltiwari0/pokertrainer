import type { Metadata } from 'next';
import PotOddsEngine from '@/components/pot-odds/PotOddsEngine';

export const metadata: Metadata = {
  title: 'Pot Odds & Equity Trainer',
  description: 'Master pot odds, counting outs, and the rule of 2 and 4. Practice calculating equity and making +EV call or fold decisions. Free poker math trainer.',
  openGraph: {
    title: 'Pot Odds & Equity Trainer — Poker Trainer',
    description: 'Practice pot odds calculations, counting outs, and the rule of 2 and 4. Make +EV decisions every hand.',
  },
};

export default function PotOddsPage() {
  return <PotOddsEngine />;
}
