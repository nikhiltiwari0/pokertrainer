'use client';

const SEATS = [
  { position: 'BTN', group: 'late', label: 'Button', top: '78%', left: '22%' },
  { position: 'SB', group: 'blind', label: 'Small Blind', top: '18%', left: '22%' },
  { position: 'BB', group: 'blind', label: 'Big Blind', top: '8%', left: '50%' },
  { position: 'UTG', group: 'early', label: 'Under the Gun', top: '18%', left: '78%' },
  { position: 'HJ', group: 'early', label: 'Hijack', top: '78%', left: '78%' },
  { position: 'CO', group: 'late', label: 'Cutoff', top: '88%', left: '50%' },
];

const GROUP_STYLES: Record<string, string> = {
  early: 'bg-blue-900/30 border-blue-700/40 text-blue-300',
  late: 'bg-emerald-900/30 border-emerald-500/40 text-emerald-300',
  blind: 'bg-amber-900/30 border-amber-700/40 text-amber-300',
};

export default function PositionDiagram() {
  return (
    <div className="bg-gray-900/40 rounded-xl border border-gray-800/50 p-4 sm:p-5">
      <p className="text-[10px] text-gray-600 uppercase tracking-wider font-medium mb-3">6-max table positions</p>

      <div className="relative w-full max-w-sm mx-auto aspect-[4/3]">
        {/* Table felt */}
        <div className="absolute inset-6 rounded-[50%] bg-gradient-to-br from-felt to-felt-dark border-2 border-emerald-900/60 shadow-[inset_0_2px_20px_rgba(0,0,0,0.4)]" />

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-emerald-800/40 text-[10px] font-mono uppercase tracking-[0.3em]">6-max</span>
        </div>

        {/* Seats */}
        {SEATS.map(seat => (
          <div
            key={seat.position}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5"
            style={{ top: seat.top, left: seat.left }}
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border ${GROUP_STYLES[seat.group]}`}>
              {seat.position}
            </div>
            <span className="text-[8px] sm:text-[9px] text-gray-500 whitespace-nowrap">{seat.label}</span>
            {seat.position === 'BTN' && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white text-[7px] text-gray-900 font-black flex items-center justify-center">D</span>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-700/60" />
          <span className="text-[10px] text-gray-500">Early (tight)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          <span className="text-[10px] text-gray-500">Late (wide)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600/60" />
          <span className="text-[10px] text-gray-500">Blinds</span>
        </div>
      </div>
    </div>
  );
}
