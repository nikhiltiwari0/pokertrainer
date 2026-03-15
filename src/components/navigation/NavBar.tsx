'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/train', label: 'Train' },
  { href: '/learn', label: 'Learn' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="h-14 border-b border-gray-800/60 bg-[#0a0f0c]/90 backdrop-blur-md px-5 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-2.5 group">
        <span className="text-gold text-xl transition-transform group-hover:scale-110">♠</span>
        <span className="font-display text-lg tracking-wide text-gray-100">PokerTrainer</span>
      </Link>

      <div className="flex items-center gap-1">
        {NAV_LINKS.map(link => {
          const isActive = link.href === '/'
            ? pathname === '/'
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-gold/15 text-gold'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                }
              `}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
