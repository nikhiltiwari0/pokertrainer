'use client';

import Link from 'next/link';
import { chapters } from '@/data/chapters';
import { useCourseProgress } from '@/hooks/useCourseProgress';

export default function LearnPage() {
  const { progress } = useCourseProgress();
  const completedCount = progress.completedChapters.length;
  const pct = chapters.length > 0 ? Math.round((completedCount / chapters.length) * 100) : 0;

  return (
    <div className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3 animate-slide-up">
        <h1 className="font-display text-3xl sm:text-4xl text-gray-50">Learn Poker</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          A complete course from the basics to advanced strategy.
          {completedCount > 0 && ` ${completedCount} of ${chapters.length} chapters completed.`}
        </p>
        {completedCount > 0 && (
          <div className="max-w-xs mx-auto">
            <div className="h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold/60 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] text-gold/50 mt-1 block">{pct}%</span>
          </div>
        )}
      </div>

      {/* Continue */}
      {progress.lastChapter && (
        <Link
          href={`/learn/${progress.lastChapter}`}
          className="block bg-gray-900/40 rounded-xl p-4 border border-gold/15 hover:border-gold/30 transition-all duration-200 animate-fade-in"
        >
          <span className="text-[10px] text-gray-600 uppercase tracking-wider">Continue where you left off</span>
          <p className="text-gold font-display text-lg mt-1">
            {chapters.find(c => c.slug === progress.lastChapter)?.title}
          </p>
        </Link>
      )}

      {/* Chapter list */}
      <div className="space-y-2.5">
        {chapters.map((ch, idx) => {
          const isCompleted = progress.completedChapters.includes(ch.slug);
          const score = progress.quizScores[ch.slug];
          return (
            <Link
              key={ch.slug}
              href={`/learn/${ch.slug}`}
              className="group flex items-center gap-4 bg-gray-900/30 rounded-xl p-4 border border-gray-800/40 hover:border-gray-700/50 hover:bg-gray-900/50 transition-all duration-200"
              style={{ animationDelay: `${idx * 0.03}s` }}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors
                ${isCompleted
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-gray-800/40 text-gray-500 border border-gray-700/40'
                }
              `}>
                {isCompleted ? '✓' : ch.order}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-300 group-hover:text-gray-100 transition-colors truncate">{ch.title}</h3>
                <p className="text-gray-600 text-xs truncate">{ch.description}</p>
              </div>
              {score !== undefined && (
                <span className={`text-xs font-medium shrink-0 tabular-nums ${score >= 70 ? 'text-emerald-400/70' : 'text-gold/70'}`}>
                  {score}%
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
