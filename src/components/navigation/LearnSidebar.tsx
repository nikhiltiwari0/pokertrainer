'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { chapters } from '@/data/chapters';
import { useCourseProgress } from '@/hooks/useCourseProgress';

export default function LearnSidebar() {
  const pathname = usePathname();
  const { progress } = useCourseProgress();

  const completedCount = progress.completedChapters.length;
  const pct = chapters.length > 0 ? Math.round((completedCount / chapters.length) * 100) : 0;

  return (
    <div className="space-y-5">
      <div className="px-3">
        <h3 className="font-display text-base text-gray-200">Course</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-gray-600 uppercase tracking-wider">
            {completedCount}/{chapters.length} completed
          </span>
          <span className="text-[10px] text-gold/60 tabular-nums">{pct}%</span>
        </div>
        <div className="mt-1.5 h-1 bg-gray-800/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold/60 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <nav className="space-y-0.5">
        {chapters.map(ch => {
          const isActive = pathname === `/learn/${ch.slug}`;
          const isCompleted = progress.completedChapters.includes(ch.slug);
          return (
            <Link
              key={ch.slug}
              href={`/learn/${ch.slug}`}
              className={`
                flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200
                ${isActive
                  ? 'bg-gold/10 text-gold'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }
              `}
            >
              <span className={`text-xs w-4 text-center ${isCompleted ? 'text-emerald-500' : 'text-gray-700'}`}>
                {isCompleted ? '✓' : `${ch.order}`}
              </span>
              <span className="truncate">{ch.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
