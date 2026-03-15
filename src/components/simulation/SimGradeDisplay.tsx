'use client';

interface SimGradeDisplayProps {
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  correctCount: number;
  totalDecisions: number;
  summary: string;
}

const GRADE_COLORS: Record<string, string> = {
  A: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  B: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
  C: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
  D: 'text-orange-400 border-orange-500/40 bg-orange-500/10',
  F: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
};

const GRADE_MESSAGES: Record<string, string> = {
  A: 'Perfect play.',
  B: 'Solid decisions overall.',
  C: 'Room for improvement.',
  D: 'Several mistakes to work on.',
  F: 'Study the fundamentals.',
};

export default function SimGradeDisplay({ grade, correctCount, totalDecisions, summary }: SimGradeDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-3 animate-scale-in">
      <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center ${GRADE_COLORS[grade]}`}>
        <span className="font-display text-3xl font-bold">{grade}</span>
      </div>
      <p className="text-gray-300 text-sm font-medium">{summary}</p>
      <p className="text-gray-500 text-xs">{GRADE_MESSAGES[grade]}</p>
    </div>
  );
}
