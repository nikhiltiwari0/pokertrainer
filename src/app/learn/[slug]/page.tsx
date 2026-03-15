import type { Metadata } from 'next';
import { chapters, getChapterBySlug } from '@/data/chapters';
import ChapterPageClient from './ChapterPageClient';

export function generateStaticParams() {
  return chapters.map(ch => ({ slug: ch.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return { title: 'Chapter Not Found — Poker Trainer' };
  return {
    title: `${chapter.title} — Learn Poker | Poker Trainer`,
    description: chapter.description,
    openGraph: {
      title: `${chapter.title} — Learn Poker`,
      description: chapter.description,
      type: 'article',
    },
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ChapterPageClient slug={slug} />;
}
