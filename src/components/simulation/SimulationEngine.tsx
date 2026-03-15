'use client';

import { useSimulation } from '@/hooks/useSimulation';
import SimTable from './SimTable';
import SimActionBar from './SimActionBar';
import SimShowdownReveal from './SimShowdownReveal';
import SimHandReview from './SimHandReview';

export default function SimulationEngine() {
  const {
    gameState,
    review,
    heroActions,
    submitHeroAction,
    startHand,
    handCount,
    isAIThinking,
    showdownResult,
    goToReview,
  } = useSimulation();

  // Idle state — no hand in progress
  if (!gameState) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6 animate-fade-in">
          <h1 className="font-display text-3xl sm:text-4xl text-gray-50">Game Simulation</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Play a full hand of 6-max No-Limit Hold&apos;em against 5 AI opponents.
            No hints during play. After each hand, review every decision you made
            with detailed feedback and a letter grade.
          </p>
          <div className="space-y-2 text-left bg-gray-900/40 rounded-xl p-4 border border-gray-800/40">
            <p className="text-xs text-gray-500">
              <span className="text-gray-400 font-medium">Stakes:</span> 1/2 blinds, 200 chip stacks
            </p>
            <p className="text-xs text-gray-500">
              <span className="text-gray-400 font-medium">Format:</span> 6-max (you + 5 opponents)
            </p>
            <p className="text-xs text-gray-500">
              <span className="text-gray-400 font-medium">Review:</span> Every decision analyzed after showdown
            </p>
          </div>
          <button
            onClick={startHand}
            className="px-8 py-3 text-sm font-bold bg-gold/15 text-gold rounded-xl border border-gold/25 hover:bg-gold/25 transition-all duration-200 hover:translate-y-[-1px] animate-glow-gold"
          >
            Deal First Hand
          </button>
        </div>
      </div>
    );
  }

  // Review phase
  if (gameState.phase === 'review' && review) {
    return (
      <div className="flex-1 flex flex-col items-center p-6 overflow-y-auto">
        <div className="max-w-xl w-full">
          <SimHandReview review={review} onNextHand={startHand} />
        </div>
      </div>
    );
  }

  // Active play or showdown
  const isShowdown = gameState.phase === 'showdown';
  const isHeroTurn = !isAIThinking && heroActions.length > 0 && !isShowdown;

  return (
    <div className="flex-1 flex flex-col items-center p-4 sm:p-6">
      {/* Hand counter */}
      <div className="w-full max-w-xl flex items-center justify-between mb-2">
        <span className="text-xs text-gray-600 font-mono">Hand #{gameState.handNumber}</span>
        {isAIThinking && (
          <span className="text-xs text-gray-500 animate-pulse">Opponents acting...</span>
        )}
        {isHeroTurn && (
          <span className="text-xs text-gold">Your turn</span>
        )}
      </div>

      {/* Table */}
      <SimTable state={gameState} showAllCards={isShowdown} />

      {/* Hero's hole cards (large) */}
      {!isShowdown && (
        <div className="mt-2 flex items-center gap-2">
          {gameState.players.find(p => p.isHero)?.holeCards.map((card, i) => {
            const color = card.suit === 'hearts' || card.suit === 'diamonds' ? 'text-[#c0392b]' : 'text-[#1a1a2e]';
            const symbol = card.suit === 'hearts' ? '\u2665' : card.suit === 'diamonds' ? '\u2666' : card.suit === 'clubs' ? '\u2663' : '\u2660';
            return (
              <div
                key={i}
                className="w-14 h-20 sm:w-16 sm:h-24 rounded-lg bg-card-face border border-card-border shadow-[0_4px_16px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center"
              >
                <span className={`text-lg sm:text-xl font-bold ${color}`}>{card.rank}</span>
                <span className={`text-base sm:text-lg ${color}`}>{symbol}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Action bar for hero */}
      {isHeroTurn && (
        <div className="mt-4 w-full max-w-lg">
          <SimActionBar
            actions={heroActions}
            pot={gameState.pot}
            onAction={submitHeroAction}
          />
        </div>
      )}

      {/* Showdown reveal */}
      {isShowdown && showdownResult && (
        <div className="mt-4 w-full max-w-xl">
          <SimShowdownReveal result={showdownResult} onContinue={goToReview} />
        </div>
      )}
    </div>
  );
}
