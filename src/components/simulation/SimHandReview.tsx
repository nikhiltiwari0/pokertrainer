'use client';

import { HandReview } from '@/types/simulation';
import SimGradeDisplay from './SimGradeDisplay';
import SimDecisionCard from './SimDecisionCard';

interface SimHandReviewProps {
  review: HandReview;
  onNextHand: () => void;
}

export default function SimHandReview({ review, onNextHand }: SimHandReviewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="font-display text-2xl text-gray-100 mb-4">Hand Review</h2>
        <SimGradeDisplay
          grade={review.overallGrade}
          correctCount={review.correctCount}
          totalDecisions={review.totalDecisions}
          summary={review.summary}
        />
      </div>

      {/* Decision timeline */}
      {review.decisionPoints.length > 0 && (
        <div className="space-y-3 max-w-lg mx-auto">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Your Decisions</h3>
          {review.decisionPoints.map((dp, i) => (
            <SimDecisionCard key={i} decision={dp} index={i} />
          ))}
        </div>
      )}

      {/* Next hand button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onNextHand}
          className="px-8 py-3 text-sm font-bold bg-gold/15 text-gold rounded-xl border border-gold/25 hover:bg-gold/25 transition-all duration-200 hover:translate-y-[-1px]"
        >
          Deal Next Hand
        </button>
      </div>
    </div>
  );
}
