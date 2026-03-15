'use client';

const STREETS = [
  { name: 'Preflop', cards: '2 hole cards', icon: '🂠🂠', color: 'border-blue-700/40 text-blue-300' },
  { name: 'Flop', cards: '3 community', icon: '🃁🃂🃃', color: 'border-emerald-700/40 text-emerald-300' },
  { name: 'Turn', cards: '+1 card', icon: '🃄', color: 'border-amber-700/40 text-amber-300' },
  { name: 'River', cards: '+1 card', icon: '🃅', color: 'border-rose-700/40 text-rose-300' },
];

export default function BettingRoundsFlow() {
  return (
    <div className="bg-gray-900/40 rounded-xl border border-gray-800/50 p-4 sm:p-5">
      <p className="text-[10px] text-gray-600 uppercase tracking-wider font-medium mb-4">The four betting rounds</p>

      {/* Desktop: horizontal flow */}
      <div className="hidden sm:flex items-center justify-between gap-2">
        {STREETS.map((street, i) => (
          <div key={street.name} className="flex items-center gap-2 flex-1">
            <div className={`flex flex-col items-center gap-1.5 flex-1 bg-gray-800/30 rounded-lg p-3 border ${street.color}`}>
              <span className="font-display text-base font-bold">{street.name}</span>
              <span className="text-[10px] text-gray-500">{street.cards}</span>
            </div>
            {i < STREETS.length - 1 && (
              <span className="text-gold/40 text-lg shrink-0">&rarr;</span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical flow */}
      <div className="flex sm:hidden flex-col gap-2">
        {STREETS.map((street, i) => (
          <div key={street.name} className="flex flex-col items-center">
            <div className={`w-full bg-gray-800/30 rounded-lg p-3 border ${street.color} flex items-center justify-between`}>
              <span className="font-display text-base font-bold">{street.name}</span>
              <span className="text-[10px] text-gray-500">{street.cards}</span>
            </div>
            {i < STREETS.length - 1 && (
              <span className="text-gold/40 text-sm my-1">&darr;</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-600 text-center mt-4">
        Each round has a complete betting cycle. After the river, remaining players go to showdown.
      </p>
    </div>
  );
}
