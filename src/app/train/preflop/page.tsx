import type { Metadata } from 'next';
import TrainerEngine from '@/components/trainer/TrainerEngine';

export const metadata: Metadata = {
  title: 'Preflop Trainer — GTO Range Drills',
  description: 'Drill GTO opening ranges, 3-bet spots, and blind defense with instant feedback and full 13x13 range charts. Free poker preflop trainer.',
  openGraph: {
    title: 'Preflop Trainer — GTO Range Drills',
    description: 'Drill GTO opening ranges, 3-bet spots, and blind defense. See the full hand matrix after each decision.',
  },
};

export default function PreflopPage() {
  return <TrainerEngine />;
}
