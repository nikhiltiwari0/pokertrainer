'use client';

import { useState } from 'react';
import { ChapterQuizQuestion } from '@/types/course';

interface QuizBlockProps {
  questions: ChapterQuizQuestion[];
  onComplete: (score: number) => void;
}

export default function QuizBlock({ questions, onComplete }: QuizBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const isAnswered = selectedIndex !== null;
  const isCorrect = selectedIndex === question?.correctIndex;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    if (index === question.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedIndex(null);
    } else {
      setFinished(true);
      onComplete(Math.round((correctCount / questions.length) * 100));
    }
  };

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= 70;
    return (
      <div className="bg-gray-900/40 rounded-xl p-6 border border-gray-800/50 text-center space-y-4">
        <div className={`text-3xl font-display ${passed ? 'text-emerald-400' : 'text-gold'}`}>
          {passed ? 'Quiz Passed' : 'Keep Studying'}
        </div>
        <p className="text-gray-500 text-sm">
          You got {correctCount} out of {questions.length} correct ({score}%)
        </p>
        {passed ? (
          <p className="text-emerald-500/70 text-xs">This chapter is now marked as complete.</p>
        ) : (
          <p className="text-gold/70 text-xs">You need 70% to complete this chapter. Review the material and try again.</p>
        )}
        {!passed && (
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSelectedIndex(null);
              setCorrectCount(0);
              setFinished(false);
            }}
            className="px-5 py-2 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold text-sm font-medium transition-all duration-200 border border-gold/20"
          >
            Retry Quiz
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-900/40 rounded-xl p-5 sm:p-6 border border-gray-800/50 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-display text-lg text-gray-200">Chapter Quiz</h3>
        <span className="text-[10px] text-gray-600 tabular-nums">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <p className="text-gray-300 text-sm sm:text-base">{question.question}</p>

      <div className="space-y-2">
        {question.options.map((option, idx) => {
          let style = 'bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/40 text-gray-400';
          if (isAnswered) {
            if (idx === question.correctIndex) {
              style = 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300';
            } else if (idx === selectedIndex) {
              style = 'bg-rose-950/40 border-rose-500/30 text-rose-300';
            } else {
              style = 'bg-gray-900/30 border-gray-800/30 text-gray-600';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all duration-200 ${style} disabled:cursor-default`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="space-y-3 animate-fade-in">
          <p className={`text-sm ${isCorrect ? 'text-emerald-400/80' : 'text-rose-400/80'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect.'} {question.explanation}
          </p>
          <button
            onClick={handleNext}
            className="px-5 py-2 rounded-lg bg-gold/15 hover:bg-gold/25 text-gold text-sm font-medium transition-all duration-200 border border-gold/20"
          >
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}
