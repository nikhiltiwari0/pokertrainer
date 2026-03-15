'use client';

type MiniSuit = 's' | 'h' | 'd' | 'c';

const SUIT_SYMBOL: Record<MiniSuit, string> = { s: '♠', h: '♥', d: '♦', c: '♣' };
const SUIT_COLOR: Record<MiniSuit, string> = { s: 'text-[#1a1a2e]', h: 'text-[#c0392b]', d: 'text-[#c0392b]', c: 'text-[#1a1a2e]' };

function MiniCard({ rank, suit }: { rank: string; suit: MiniSuit }) {
  return (
    <span className={`inline-flex items-center justify-center w-7 h-9 rounded bg-card-face border border-card-border text-[10px] font-bold ${SUIT_COLOR[suit]} shadow-sm`}>
      {rank}{SUIT_SYMBOL[suit]}
    </span>
  );
}

const HANDS: Array<{ name: string; cards: Array<{ rank: string; suit: MiniSuit }>; rarity: string }> = [
  { name: 'Royal Flush', cards: [{ rank: 'A', suit: 's' }, { rank: 'K', suit: 's' }, { rank: 'Q', suit: 's' }, { rank: 'J', suit: 's' }, { rank: 'T', suit: 's' }], rarity: '1 in 650k' },
  { name: 'Straight Flush', cards: [{ rank: '9', suit: 'h' }, { rank: '8', suit: 'h' }, { rank: '7', suit: 'h' }, { rank: '6', suit: 'h' }, { rank: '5', suit: 'h' }], rarity: '1 in 72k' },
  { name: 'Four of a Kind', cards: [{ rank: 'K', suit: 's' }, { rank: 'K', suit: 'h' }, { rank: 'K', suit: 'd' }, { rank: 'K', suit: 'c' }, { rank: '7', suit: 's' }], rarity: '1 in 4.2k' },
  { name: 'Full House', cards: [{ rank: 'Q', suit: 'h' }, { rank: 'Q', suit: 'd' }, { rank: 'Q', suit: 'c' }, { rank: '8', suit: 's' }, { rank: '8', suit: 'h' }], rarity: '1 in 694' },
  { name: 'Flush', cards: [{ rank: 'A', suit: 'd' }, { rank: 'J', suit: 'd' }, { rank: '8', suit: 'd' }, { rank: '6', suit: 'd' }, { rank: '3', suit: 'd' }], rarity: '1 in 508' },
  { name: 'Straight', cards: [{ rank: '9', suit: 's' }, { rank: '8', suit: 'h' }, { rank: '7', suit: 'd' }, { rank: '6', suit: 'c' }, { rank: '5', suit: 's' }], rarity: '1 in 255' },
  { name: 'Three of a Kind', cards: [{ rank: 'J', suit: 's' }, { rank: 'J', suit: 'h' }, { rank: 'J', suit: 'd' }, { rank: '9', suit: 'c' }, { rank: '4', suit: 's' }], rarity: '1 in 47' },
  { name: 'Two Pair', cards: [{ rank: 'A', suit: 's' }, { rank: 'A', suit: 'h' }, { rank: '5', suit: 'd' }, { rank: '5', suit: 'c' }, { rank: 'K', suit: 's' }], rarity: '1 in 21' },
  { name: 'One Pair', cards: [{ rank: 'T', suit: 'h' }, { rank: 'T', suit: 'd' }, { rank: 'K', suit: 's' }, { rank: '7', suit: 'c' }, { rank: '2', suit: 'h' }], rarity: '1 in 2.4' },
  { name: 'High Card', cards: [{ rank: 'A', suit: 's' }, { rank: 'J', suit: 'h' }, { rank: '8', suit: 'd' }, { rank: '5', suit: 'c' }, { rank: '3', suit: 's' }], rarity: '1 in 2' },
];

export default function HandRankingsChart() {
  return (
    <div className="bg-gray-900/40 rounded-xl border border-gray-800/50 p-4 sm:p-5 space-y-1.5">
      <p className="text-[10px] text-gray-600 uppercase tracking-wider font-medium mb-3">Strongest to weakest</p>
      {HANDS.map((hand, i) => (
        <div
          key={hand.name}
          className={`flex items-center gap-3 py-1.5 px-2 rounded-lg ${i === 0 ? 'bg-gold/5' : ''}`}
        >
          <span className={`text-xs font-bold w-5 text-right tabular-nums ${i === 0 ? 'text-gold' : 'text-gray-600'}`}>
            {i + 1}
          </span>
          <div className="flex gap-0.5 shrink-0">
            {hand.cards.map((c, j) => (
              <MiniCard key={j} rank={c.rank} suit={c.suit} />
            ))}
          </div>
          <span className={`text-sm font-medium flex-1 ${i === 0 ? 'text-gold' : 'text-gray-300'}`}>
            {hand.name}
          </span>
          <span className="text-[10px] text-gray-600 font-mono hidden sm:inline">{hand.rarity}</span>
        </div>
      ))}
    </div>
  );
}
