'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MODULES = [
  { href: '/train/hand-rankings', label: 'Rankings' },
  { href: '/train/hand-recognition', label: 'Recognition' },
  { href: '/train/position', label: 'Position' },
  { href: '/train/preflop', label: 'Preflop' },
  { href: '/train/outs-equity', label: 'Outs & Equity' },
  { href: '/train/pot-odds', label: 'Pot Odds' },
  { href: '/train/postflop', label: 'Postflop' },
  { href: '/train/simulation', label: 'Simulate' },
];

export default function TrainSubNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-800/50 bg-[#0a0f0c]/80 backdrop-blur-sm px-5 py-2.5 flex gap-2 overflow-x-auto">
      {MODULES.map(mod => {
        const isActive = pathname === mod.href;
        return (
          <Link
            key={mod.href}
            href={mod.href}
            className={`
              px-3.5 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
              ${isActive
                ? 'bg-gold/15 text-gold border border-gold/20'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
              }
            `}
          >
            {mod.label}
          </Link>
        );
      })}
    </div>
  );
}
