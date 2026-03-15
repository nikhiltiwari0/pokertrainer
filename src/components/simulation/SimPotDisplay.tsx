'use client';

interface SimPotDisplayProps {
  pot: number;
  street: string;
}

export default function SimPotDisplay({ pot, street }: SimPotDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">{street}</span>
      <div className="bg-gray-900/80 border border-gray-700/50 rounded-lg px-4 py-1.5 backdrop-blur-sm">
        <span className="text-gold font-mono font-bold text-sm">{pot}</span>
        <span className="text-gray-500 text-xs ml-1">chips</span>
      </div>
    </div>
  );
}
