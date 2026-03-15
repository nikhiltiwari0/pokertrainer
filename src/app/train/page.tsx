import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Training Modules',
  description: 'Choose from preflop ranges, hand recognition, pot odds, and postflop training modules to sharpen your poker skills.',
  openGraph: {
    title: 'Training Modules — Poker Trainer',
    description: 'Drill GTO ranges, hand recognition, pot odds, and postflop decisions. Free poker training in your browser.',
  },
};

const MODULES = [
  {
    href: '/train/hand-rankings',
    title: 'Hand Rankings',
    description: 'Two hands, one board. Pick the winner. Drill the hand ranking hierarchy until it\'s automatic.',
    icon: '&#9824;',
    level: 'Beginner',
    color: 'purple',
    skills: ['Hand comparison', 'Ranking order', 'Tiebreakers'],
  },
  {
    href: '/train/hand-recognition',
    title: 'Hand Recognition',
    description: 'See a board and hole cards — quickly identify what hand you have. Build speed and accuracy.',
    icon: '&#9830;',
    level: 'Beginner',
    color: 'blue',
    skills: ['Made hands', 'Speed reading', 'Board texture'],
  },
  {
    href: '/train/position',
    title: 'Position Drill',
    description: 'Test your understanding of table positions, action order, and when to play which hands.',
    icon: '&#9827;',
    level: 'Beginner',
    color: 'teal',
    skills: ['Action order', 'Position types', 'Opening strategy'],
  },
  {
    href: '/train/preflop',
    title: 'Preflop Ranges',
    description: 'Drill GTO opening ranges, 3-bet spots, and blind defense. See the full 13x13 hand matrix after each decision.',
    icon: '&#9824;',
    level: 'Core',
    color: 'emerald',
    skills: ['RFI ranges', '3-bet / 4-bet', 'Blind defense'],
  },
  {
    href: '/train/outs-equity',
    title: 'Outs & Equity',
    description: 'Count your outs and estimate equity using the Rule of 2 and 4. The math that makes you profitable.',
    icon: '&#9829;',
    level: 'Intermediate',
    color: 'cyan',
    skills: ['Counting outs', 'Rule of 2 & 4', 'Equity estimation'],
  },
  {
    href: '/train/pot-odds',
    title: 'Pot Odds',
    description: 'Given a pot, a bet, and your draw — should you call or fold? Apply the math in real scenarios.',
    icon: '&#9829;',
    level: 'Intermediate',
    color: 'amber',
    skills: ['Pot odds', 'Call vs fold', 'Draw decisions'],
  },
  {
    href: '/train/postflop',
    title: 'Postflop Play',
    description: 'Practice c-bets, value bets, bluffs, and pot control with curated scenario drills.',
    icon: '&#9827;',
    level: 'Advanced',
    color: 'rose',
    skills: ['C-betting', 'Value vs bluff', 'Pot control'],
  },
  {
    href: '/train/simulation',
    title: 'Game Simulation',
    description: 'Play full hands of 6-max against AI opponents. No hints — just review after every hand with a letter grade.',
    icon: '&#127183;',
    level: 'All Levels',
    color: 'gold',
    skills: ['Full hands', 'Decision review', 'Post-hand analysis'],
  },
];

const BORDER_COLORS: Record<string, string> = {
  emerald: 'border-emerald-800/40 hover:border-emerald-600/50',
  blue: 'border-blue-800/40 hover:border-blue-600/50',
  amber: 'border-amber-800/40 hover:border-amber-600/50',
  rose: 'border-rose-800/40 hover:border-rose-600/50',
  purple: 'border-purple-800/40 hover:border-purple-600/50',
  teal: 'border-teal-800/40 hover:border-teal-600/50',
  cyan: 'border-cyan-800/40 hover:border-cyan-600/50',
  gold: 'border-gold-dim/40 hover:border-gold/50',
};

const ICON_COLORS: Record<string, string> = {
  emerald: 'text-emerald-500',
  blue: 'text-blue-500',
  amber: 'text-amber-500',
  rose: 'text-rose-500',
  purple: 'text-purple-500',
  teal: 'text-teal-500',
  cyan: 'text-cyan-500',
  gold: 'text-gold',
};

const TAG_COLORS: Record<string, string> = {
  emerald: 'text-emerald-400/70 bg-emerald-500/10',
  blue: 'text-blue-400/70 bg-blue-500/10',
  amber: 'text-amber-400/70 bg-amber-500/10',
  rose: 'text-rose-400/70 bg-rose-500/10',
  purple: 'text-purple-400/70 bg-purple-500/10',
  teal: 'text-teal-400/70 bg-teal-500/10',
  cyan: 'text-cyan-400/70 bg-cyan-500/10',
  gold: 'text-gold bg-gold/10',
};

export default function TrainHub() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-3">
          <h1 className="font-display text-3xl sm:text-4xl text-gray-50">Training Modules</h1>
          <p className="text-gray-500 text-sm">Choose a module to sharpen your skills</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MODULES.map(mod => (
            <Link
              key={mod.href}
              href={mod.href}
              className={`
                group block bg-gray-900/50 rounded-xl p-5 border transition-all duration-200
                hover:bg-gray-900/80 hover:translate-y-[-2px]
                ${BORDER_COLORS[mod.color]}
              `}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-2xl ${ICON_COLORS[mod.color]}`} dangerouslySetInnerHTML={{ __html: mod.icon }} />
                <div>
                  <h2 className="font-display text-lg text-gray-100 group-hover:text-white transition-colors">
                    {mod.title}
                  </h2>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${TAG_COLORS[mod.color]}`}>
                    {mod.level}
                  </span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-3 leading-relaxed">{mod.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {mod.skills.map(skill => (
                  <span key={skill} className="text-[10px] text-gray-600 bg-gray-800/60 px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-gray-700 text-xs">
          Suggested order: Hand Rankings &rarr; Hand Recognition &rarr; Position &rarr; Preflop &rarr; Outs &amp; Equity &rarr; Pot Odds &rarr; Postflop
        </p>
      </div>
    </div>
  );
}
