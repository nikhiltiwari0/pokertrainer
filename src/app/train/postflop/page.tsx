import type { Metadata } from 'next';
import PostflopEngine from '@/components/postflop/PostflopEngine';

export const metadata: Metadata = {
  title: 'Postflop Trainer',
  description: 'Practice postflop decisions — continuation bets, value bets, bluffs, and pot control with curated scenarios. Free poker postflop trainer.',
  openGraph: {
    title: 'Postflop Trainer — Poker Trainer',
    description: 'Practice c-bets, value bets, bluffs, and pot control with curated postflop scenarios.',
  },
};

export default function PostflopPage() {
  return <PostflopEngine />;
}
