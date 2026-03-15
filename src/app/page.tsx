import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: "Poker Trainer — Free GTO Poker Training",
  description: "Free, open-source poker training platform. Master GTO preflop ranges, hand recognition, pot odds, postflop strategy, and learn poker from scratch.",
  openGraph: {
    title: "Poker Trainer — Free GTO Poker Training",
    description: "Free, open-source poker training. Master GTO ranges, pot odds, and postflop play — all in your browser.",
  },
};

export default function Home() {
  return <HomePageClient />;
}
