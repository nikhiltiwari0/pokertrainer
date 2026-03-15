import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Poker Trainer — Free GTO Poker Training",
  description: "Free, open-source poker training platform. Master GTO preflop ranges, hand recognition, pot odds, postflop strategy, and learn poker from scratch.",
  openGraph: {
    title: "Poker Trainer — Free GTO Poker Training",
    description: "Free, open-source poker training. Master GTO ranges, pot odds, and postflop play — all in your browser.",
  },
};

const MODULES = [
  {
    href: '/train/preflop',
    title: 'Preflop Ranges',
    desc: 'Drill GTO opening, 3-bet, and defense ranges',
    accent: 'border-emerald-700/40 hover:border-emerald-500/50',
    dot: 'bg-emerald-500',
    level: 'Core',
  },
  {
    href: '/train/hand-recognition',
    title: 'Hand Recognition',
    desc: 'Instantly identify your hand strength',
    accent: 'border-blue-700/40 hover:border-blue-500/50',
    dot: 'bg-blue-500',
    level: 'Beginner',
  },
  {
    href: '/train/pot-odds',
    title: 'Pot Odds & Equity',
    desc: 'Master the math behind every call',
    accent: 'border-amber-700/40 hover:border-amber-500/50',
    dot: 'bg-amber-500',
    level: 'Intermediate',
  },
  {
    href: '/train/postflop',
    title: 'Postflop Play',
    desc: 'C-bets, value bets, bluffs, and reads',
    accent: 'border-rose-700/40 hover:border-rose-500/50',
    dot: 'bg-rose-500',
    level: 'Advanced',
  },
];

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-12 sm:py-16 relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-[100px]" />
      </div>

      {/* Decorative suit symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none" aria-hidden="true">
        <span className="absolute text-[200px] top-[10%] left-[5%] rotate-12">&#9824;</span>
        <span className="absolute text-[160px] top-[60%] right-[8%] -rotate-6">&#9829;</span>
        <span className="absolute text-[140px] bottom-[15%] left-[15%] rotate-[-20deg]">&#9830;</span>
        <span className="absolute text-[180px] top-[5%] right-[20%] rotate-[25deg]">&#9827;</span>
      </div>

      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        {/* Hero */}
        <div className="space-y-6 animate-slide-up">
          <div className="flex items-center justify-center gap-4 text-4xl sm:text-5xl">
            <span className="text-gray-300">&#9824;</span>
            <span className="text-rose-500">&#9829;</span>
            <span className="text-rose-500">&#9830;</span>
            <span className="text-gray-300">&#9827;</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gray-50 leading-tight tracking-tight">
            Master the Game
          </h1>

          <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            Free, open-source poker training. Learn the fundamentals, drill GTO ranges,
            and sharpen every aspect of your game.
          </p>
        </div>

        {/* Two-path CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-2" style={{ animationFillMode: 'both' }}>
          <Link
            href="/learn"
            className="group relative px-8 py-4 rounded-xl bg-gray-800/60 border border-gray-700/50 text-gray-200 font-medium text-base transition-all duration-300 hover:bg-gray-800 hover:border-gray-600"
          >
            <span className="block text-xs text-gray-500 mb-0.5">New to poker?</span>
            <span className="font-display text-lg">Start Learning</span>
            <span className="ml-2 text-gray-600 group-hover:text-gray-400 transition-colors">&rarr;</span>
          </Link>

          <Link
            href="/train"
            className="group relative px-8 py-4 rounded-xl bg-gold/10 border border-gold/30 text-gold-bright font-medium text-base transition-all duration-300 hover:bg-gold/15 hover:border-gold/50 animate-glow-gold"
          >
            <span className="block text-xs text-gold-dim mb-0.5">Ready to practice?</span>
            <span className="font-display text-lg">Start Training</span>
            <span className="ml-2 text-gold-dim group-hover:text-gold transition-colors">&rarr;</span>
          </Link>
        </div>

        {/* Module cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 animate-slide-up delay-4" style={{ animationFillMode: 'both' }}>
          {MODULES.map(mod => (
            <Link
              key={mod.href}
              href={mod.href}
              className={`group flex items-start gap-3 bg-gray-900/40 rounded-xl p-4 border transition-all duration-200 text-left hover:bg-gray-900/70 ${mod.accent}`}
            >
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${mod.dot}`} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-200 text-sm group-hover:text-white transition-colors">{mod.title}</span>
                  <span className="text-[10px] text-gray-600 bg-gray-800/80 px-1.5 py-0.5 rounded">{mod.level}</span>
                </div>
                <p className="text-gray-600 text-xs mt-0.5">{mod.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-gray-700 text-xs animate-slide-up delay-6" style={{ animationFillMode: 'both' }}>
          No sign-up required. Runs entirely in your browser.
        </p>
      </div>
    </div>
  );
}
