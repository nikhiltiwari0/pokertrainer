import type { Metadata } from 'next';
import HandRecognitionEngine from '@/components/hand-recognition/HandRecognitionEngine';

export const metadata: Metadata = {
  title: 'Hand Recognition Quiz',
  description: 'Quickly identify poker hand strength from board and hole cards. Practice spotting pairs, straights, flushes, full houses and more. Free poker hand quiz.',
  openGraph: {
    title: 'Hand Recognition Quiz — Poker Trainer',
    description: 'Practice identifying poker hands fast. Speed and accuracy drills for pairs, straights, flushes, and more.',
  },
};

export default function HandRecognitionPage() {
  return <HandRecognitionEngine />;
}
