import { Chapter } from '@/types/course';
import { chapter01 } from './chapter-01-what-is-poker';
import { chapter02 } from './chapter-02-hand-rankings';
import { chapter03 } from './chapter-03-betting-rounds';
import { chapter04 } from './chapter-04-positions';
import { chapter05 } from './chapter-05-betting-actions';
import { chapter06 } from './chapter-06-starting-hands';
import { chapter07 } from './chapter-07-pot-odds';
import { chapter08 } from './chapter-08-preflop-strategy';
import { chapter09 } from './chapter-09-postflop-fundamentals';
import { chapter10 } from './chapter-10-common-mistakes';
import { chapter11 } from './chapter-11-glossary';

export const chapters: Chapter[] = [
  chapter01,
  chapter02,
  chapter03,
  chapter04,
  chapter05,
  chapter06,
  chapter07,
  chapter08,
  chapter09,
  chapter10,
  chapter11,
].sort((a, b) => a.order - b.order);

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find(ch => ch.slug === slug);
}
