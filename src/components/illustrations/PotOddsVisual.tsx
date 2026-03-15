'use client';

export default function PotOddsVisual() {
  return (
    <div className="bg-gray-900/40 rounded-xl border border-gray-800/50 p-4 sm:p-5 space-y-5">
      <p className="text-[10px] text-gray-600 uppercase tracking-wider font-medium">Example calculation</p>

      {/* Visual breakdown */}
      <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 rounded-full bg-felt-dark/60 border-2 border-emerald-900/60 flex items-center justify-center">
            <span className="text-gold font-display text-lg">100</span>
          </div>
          <span className="text-[10px] text-gray-500">Pot</span>
        </div>

        <span className="text-gray-600 text-lg font-light">+</span>

        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 rounded-full bg-rose-900/20 border-2 border-rose-800/40 flex items-center justify-center">
            <span className="text-rose-300 font-display text-lg">50</span>
          </div>
          <span className="text-[10px] text-gray-500">Opponent bets</span>
        </div>

        <span className="text-gray-600 text-lg font-light">+</span>

        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 rounded-full bg-blue-900/20 border-2 border-blue-700/40 flex items-center justify-center">
            <span className="text-blue-300 font-display text-lg">50</span>
          </div>
          <span className="text-[10px] text-gray-500">Your call</span>
        </div>

        <span className="text-gray-600 text-lg font-light">=</span>

        <div className="flex flex-col items-center gap-1">
          <div className="w-16 h-16 rounded-full bg-gray-800/40 border-2 border-gray-700/40 flex items-center justify-center">
            <span className="text-gray-200 font-display text-lg">200</span>
          </div>
          <span className="text-[10px] text-gray-500">Total pot</span>
        </div>
      </div>

      {/* Formula */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-400 font-mono">
          50 / 200 = <span className="text-gold font-bold">25%</span>
        </p>
        <p className="text-[10px] text-gray-600">You need to win at least 25% of the time for calling to be profitable</p>
      </div>

      {/* Decision */}
      <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/30">
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-500 text-xs block">Your equity</span>
            <span className="text-emerald-400 font-bold">36%</span>
          </div>
          <div className="text-gray-600 text-xs">&gt;</div>
          <div>
            <span className="text-gray-500 text-xs block">Pot odds</span>
            <span className="text-gold font-bold">25%</span>
          </div>
          <div className="text-gray-600 text-xs">&rarr;</div>
          <div className="bg-emerald-500/10 text-emerald-400 font-bold text-sm px-3 py-1 rounded">
            CALL
          </div>
        </div>
      </div>
    </div>
  );
}
