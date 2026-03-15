'use client';

import Link from 'next/link';
import { Chapter } from '@/types/course';

interface ChapterNavProps {
  prev: Chapter | null;
  next: Chapter | null;
}

export default function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-800/40">
      {prev ? (
        <Link
          href={`/learn/${prev.slug}`}
          className="group text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          <span className="group-hover:-translate-x-0.5 inline-block transition-transform">&larr;</span> {prev.title}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/learn/${next.slug}`}
          className="group text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          {next.title} <span className="group-hover:translate-x-0.5 inline-block transition-transform">&rarr;</span>
        </Link>
      ) : (
        <Link
          href="/learn"
          className="group text-sm text-gold/70 hover:text-gold transition-colors"
        >
          Back to Course <span className="group-hover:translate-x-0.5 inline-block transition-transform">&rarr;</span>
        </Link>
      )}
    </div>
  );
}
