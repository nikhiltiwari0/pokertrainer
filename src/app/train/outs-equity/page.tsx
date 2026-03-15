import type { Metadata } from 'next';
import OutsEquityEngine from '@/components/outs-equity/OutsEquityEngine';

export const metadata: Metadata = {
  title: 'Outs & Equity Drill',
  description: 'Practice counting outs and estimating equity with the Rule of 2 and 4. Master the math of poker draws.',
  openGraph: {
    title: 'Outs & Equity Drill — Poker Trainer',
    description: 'Count outs and estimate equity for common poker draws. Free practice drills.',
  },
};

export default function OutsEquityPage() {
  return <OutsEquityEngine />;
}
