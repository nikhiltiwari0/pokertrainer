'use client';

import { useCallback } from 'react';
import { CourseProgress } from '@/types/course';
import { useLocalStorage } from './useLocalStorage';

const PROGRESS_KEY = 'poker-trainer-course-progress';

function defaultProgress(): CourseProgress {
  return {
    completedChapters: [],
    quizScores: {},
    lastChapter: null,
    lastUpdated: Date.now(),
  };
}

export function useCourseProgress() {
  const [progress, setProgress] = useLocalStorage<CourseProgress>(PROGRESS_KEY, defaultProgress());

  const completeChapter = useCallback((slug: string, quizScore: number) => {
    setProgress(prev => {
      const completed = prev.completedChapters.includes(slug)
        ? prev.completedChapters
        : [...prev.completedChapters, slug];

      const bestScore = Math.max(prev.quizScores[slug] ?? 0, quizScore);

      return {
        ...prev,
        completedChapters: completed,
        quizScores: { ...prev.quizScores, [slug]: bestScore },
        lastChapter: slug,
        lastUpdated: Date.now(),
      };
    });
  }, [setProgress]);

  const setLastChapter = useCallback((slug: string) => {
    setProgress(prev => ({ ...prev, lastChapter: slug, lastUpdated: Date.now() }));
  }, [setProgress]);

  const resetProgress = useCallback(() => setProgress(defaultProgress()), [setProgress]);

  return { progress, completeChapter, setLastChapter, resetProgress };
}
