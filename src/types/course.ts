export interface ChapterQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChapterSection {
  heading: string;
  content: string;
}

export interface Chapter {
  slug: string;
  title: string;
  description: string;
  order: number;
  sections: ChapterSection[];
  quiz: ChapterQuizQuestion[];
  linkedTrainer?: {
    href: string;
    label: string;
  };
}

export interface CourseProgress {
  completedChapters: string[];
  quizScores: Record<string, number>;
  lastChapter: string | null;
  lastUpdated: number;
}
