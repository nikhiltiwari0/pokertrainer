'use client';

import Link from 'next/link';
import { chapters } from '@/data/chapters';
import { useCourseProgress } from '@/hooks/useCourseProgress';

const MODULES = [
  { href: '/train/hand-rankings', title: 'Hand Rankings', desc: 'Compare hands, pick the winner', color: 'purple', level: 'Beginner' },
  { href: '/train/hand-recognition', title: 'Hand Recognition', desc: 'Identify your hand strength fast', color: 'blue', level: 'Beginner' },
  { href: '/train/position', title: 'Position Drill', desc: 'Master table positions', color: 'teal', level: 'Beginner' },
  { href: '/train/preflop', title: 'Preflop Ranges', desc: 'Drill GTO opening ranges', color: 'emerald', level: 'Core' },
  { href: '/train/outs-equity', title: 'Outs & Equity', desc: 'Count outs, estimate equity', color: 'cyan', level: 'Intermediate' },
  { href: '/train/pot-odds', title: 'Pot Odds', desc: 'Should you call or fold?', color: 'amber', level: 'Intermediate' },
  { href: '/train/postflop', title: 'Postflop Play', desc: 'C-bets, value bets, bluffs', color: 'rose', level: 'Advanced' },
];

const BORDER_COLORS: Record<string, string> = {
  emerald: 'border-emerald-800/40 hover:border-emerald-600/50',
  blue: 'border-blue-800/40 hover:border-blue-600/50',
  amber: 'border-amber-800/40 hover:border-amber-600/50',
  rose: 'border-rose-800/40 hover:border-rose-600/50',
  purple: 'border-purple-800/40 hover:border-purple-600/50',
  teal: 'border-teal-800/40 hover:border-teal-600/50',
  cyan: 'border-cyan-800/40 hover:border-cyan-600/50',
};

const DOT_COLORS: Record<string, string> = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  purple: 'bg-purple-500',
  teal: 'bg-teal-500',
  cyan: 'bg-cyan-500',
};

const TAG_COLORS: Record<string, string> = {
  emerald: 'text-emerald-400/70 bg-emerald-500/10',
  blue: 'text-blue-400/70 bg-blue-500/10',
  amber: 'text-amber-400/70 bg-amber-500/10',
  rose: 'text-rose-400/70 bg-rose-500/10',
  purple: 'text-purple-400/70 bg-purple-500/10',
  teal: 'text-teal-400/70 bg-teal-500/10',
  cyan: 'text-cyan-400/70 bg-cyan-500/10',
};

export default function HomePageClient() {
  const { progress } = useCourseProgress();
  const completedCount = progress.completedChapters.length;
  const pct = chapters.length > 0 ? Math.round((completedCount / chapters.length) * 100) : 0;

  return (
    <div className="flex-1 flex flex-col items-center px-5 py-12 sm:py-16 relative overflow-hidden">
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

      <div className="max-w-4xl w-full space-y-14 relative z-10">

        {/* ─── Section 1: Hero ─── */}
        <div className="text-center space-y-5 animate-slide-up">
          <div className="flex items-center justify-center gap-4 text-4xl sm:text-5xl">
            <span className="text-gray-300">&#9824;</span>
            <span className="text-rose-500">&#9829;</span>
            <span className="text-rose-500">&#9830;</span>
            <span className="text-gray-300">&#9827;</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-gray-50 leading-tight tracking-tight">
            Master the Game
          </h1>

          <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Free, open-source poker training. Learn the fundamentals, drill GTO ranges,
            and sharpen every aspect of your game.
          </p>
        </div>

        {/* ─── Section 2: Game Simulation (featured) ─── */}
        <div className="animate-slide-up delay-1" style={{ animationFillMode: 'both' }}>
          <Link
            href="/train/simulation"
            className="group block bg-gray-900/50 rounded-2xl p-6 sm:p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:translate-y-[-2px] animate-glow-gold"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <div className="flex-1">
                <span className="text-[10px] font-medium text-gold/60 uppercase tracking-wider">Featured Mode</span>
                <h2 className="font-display text-2xl sm:text-3xl text-gray-50 mt-1 group-hover:text-white transition-colors">
                  Game Simulation
                </h2>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-md">
                  Play full hands of 6-max No-Limit Hold&apos;em against AI opponents. No hints during play.
                  After each hand, review every decision with a letter grade.
                </p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-2 sm:shrink-0">
                <span className="text-gold bg-gold/10 text-[10px] font-medium px-2 py-0.5 rounded">All Levels</span>
                <div className="flex gap-2">
                  {['Full hands', 'AI opponents', 'Decision review'].map(tag => (
                    <span key={tag} className="text-[10px] text-gray-600 bg-gray-800/60 px-2 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <span className="text-gold/70 text-sm font-medium group-hover:text-gold transition-colors mt-1">
                  Play now &rarr;
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* ─── Section 3: Learn Course ─── */}
        <section className="space-y-4 animate-slide-up delay-2" style={{ animationFillMode: 'both' }}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-gray-100">Learn Poker</h2>
            <Link href="/learn" className="text-sm text-gold/60 hover:text-gold transition-colors">
              View course &rarr;
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            11 chapters from the basics to advanced strategy.
            {completedCount > 0 && ` ${completedCount} of ${chapters.length} complete.`}
          </p>

          {/* Progress bar */}
          {completedCount > 0 && (
            <div className="max-w-xs">
              <div className="h-1.5 bg-gray-800/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold/60 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[10px] text-gold/50 mt-1 block">{pct}%</span>
            </div>
          )}

          {/* Chapter grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {chapters.map(ch => {
              const done = progress.completedChapters.includes(ch.slug);
              return (
                <Link
                  key={ch.slug}
                  href={`/learn/${ch.slug}`}
                  className="group flex items-center gap-3 bg-gray-900/30 rounded-lg p-3 border border-gray-800/40 hover:border-gray-700/50 hover:bg-gray-900/50 transition-all duration-200"
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    done
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-gray-800/40 text-gray-600 border border-gray-700/40'
                  }`}>
                    {done ? '✓' : ch.order}
                  </span>
                  <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors truncate">
                    {ch.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─── Section 4: Training Modules ─── */}
        <section className="space-y-4 animate-slide-up delay-3" style={{ animationFillMode: 'both' }}>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-gray-100">Training Modules</h2>
            <Link href="/train" className="text-sm text-gold/60 hover:text-gold transition-colors">
              View all &rarr;
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            Targeted drills for every skill level.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MODULES.slice(0, 6).map(mod => (
              <Link
                key={mod.href}
                href={mod.href}
                className={`group flex items-start gap-3 bg-gray-900/40 rounded-xl p-4 border transition-all duration-200 text-left hover:bg-gray-900/70 hover:translate-y-[-1px] ${BORDER_COLORS[mod.color]}`}
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${DOT_COLORS[mod.color]}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-200 text-sm group-hover:text-white transition-colors">{mod.title}</span>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${TAG_COLORS[mod.color]}`}>{mod.level}</span>
                  </div>
                  <p className="text-gray-600 text-xs mt-0.5">{mod.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          {MODULES.length > 6 && (
            <div className="flex justify-center mt-3">
              {MODULES.slice(6).map(mod => (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className={`group flex items-start gap-3 bg-gray-900/40 rounded-xl p-4 border transition-all duration-200 text-left hover:bg-gray-900/70 hover:translate-y-[-1px] w-full sm:w-1/2 ${BORDER_COLORS[mod.color]}`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${DOT_COLORS[mod.color]}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-200 text-sm group-hover:text-white transition-colors">{mod.title}</span>
                      <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${TAG_COLORS[mod.color]}`}>{mod.level}</span>
                    </div>
                    <p className="text-gray-600 text-xs mt-0.5">{mod.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ─── Section 5: Footer ─── */}
        <p className="text-center text-gray-700 text-xs animate-slide-up delay-4" style={{ animationFillMode: 'both' }}>
          No sign-up required.
        </p>
      </div>
    </div>
  );
}
