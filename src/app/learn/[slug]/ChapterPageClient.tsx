'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { chapters, getChapterBySlug } from '@/data/chapters';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import ChapterContent from '@/components/learn/ChapterContent';
import ChapterNav from '@/components/learn/ChapterNav';
import QuizBlock from '@/components/learn/QuizBlock';

interface ChapterPageClientProps {
  slug: string;
}

export default function ChapterPageClient({ slug }: ChapterPageClientProps) {
  const chapter = getChapterBySlug(slug);
  const { progress, completeChapter, setLastChapter } = useCourseProgress();

  useEffect(() => {
    if (chapter) {
      setLastChapter(chapter.slug);
    }
  }, [chapter, setLastChapter]);

  if (!chapter) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-gray-500">Chapter not found.</p>
      </div>
    );
  }

  const chapterIndex = chapters.findIndex(c => c.slug === chapter.slug);
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;
  const isCompleted = progress.completedChapters.includes(chapter.slug);

  const handleQuizComplete = (score: number) => {
    if (score >= 70) {
      completeChapter(chapter.slug, score);
    }
  };

  return (
    <div className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">Chapter {chapter.order}</span>
          {isCompleted && (
            <span className="text-[10px] text-emerald-500/70 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Completed
            </span>
          )}
        </div>
        <h1 className="font-display text-2xl sm:text-3xl text-gray-50">{chapter.title}</h1>
        <p className="text-gray-500 text-sm">{chapter.description}</p>
      </div>

      {/* Content */}
      <ChapterContent sections={chapter.sections} />

      {/* Quiz */}
      {chapter.quiz.length > 0 && (
        <div className="pt-4">
          <QuizBlock questions={chapter.quiz} onComplete={handleQuizComplete} />
        </div>
      )}

      {/* Linked trainer */}
      {chapter.linkedTrainer && (
        <Link
          href={chapter.linkedTrainer.href}
          className="block rounded-xl border border-gold/20 bg-gold/5 p-5 transition-all duration-200 hover:bg-gold/10 hover:border-gold/30 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gold/60 uppercase tracking-wider">Practice what you learned</span>
              <p className="text-gold-bright font-display text-lg mt-1 group-hover:translate-x-1 transition-transform">
                {chapter.linkedTrainer.label} &rarr;
              </p>
            </div>
            <span className="text-gold/40 text-2xl">&#9824;</span>
          </div>
        </Link>
      )}

      {/* Navigation */}
      <ChapterNav prev={prevChapter} next={nextChapter} />
    </div>
  );
}
