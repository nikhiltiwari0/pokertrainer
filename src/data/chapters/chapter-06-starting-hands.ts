import { Chapter } from '@/types/course';

export const chapter06: Chapter = {
  slug: 'starting-hands',
  title: 'Starting Hands',
  description: 'Which two-card combos are worth playing, and why hand selection wins money.',
  order: 6,
  sections: [
    {
      heading: 'The three types of starting hands',
      content: `Your two hole cards come in three flavors:\n\nPocket pairs: two cards of the same rank, like AA, 77, or 22. These are special because you already have a made hand before the flop. Premium pairs (AA, KK, QQ) are the strongest starting hands in the game. There are 6 possible combos of each pair (different suit combinations).\n\nSuited hands: two different ranks that share a suit, like A-K of hearts. Notation uses an "s" (AKs). These are more valuable than they might seem because they can make flushes, which are hard for opponents to see coming. There are 4 possible combos of each suited hand.\n\nOffsuit hands: two different ranks in different suits, like A-K where one is a spade and the other is a heart. Notation uses an "o" (AKo). These are weaker than their suited versions because you can't make a flush. There are 12 combos of each offsuit hand, which is why you'll see them way more often.`,
    },
    {
      heading: '169 unique hands',
      content: `There are 1,326 possible two-card combos from a 52-card deck. But when you ignore specific suits (since suits don't matter for ranking), those collapse into 169 distinct starting hands: 13 pocket pairs, 78 suited combos, and 78 offsuit combos.\n\nPoker players display these on a 13x13 grid called a "hand matrix." Pairs run along the diagonal. Suited hands are above the diagonal. Offsuit hands are below it. You'll see this matrix constantly in the training tools. After a while, you'll have it memorized.`,
    },
    {
      heading: 'Grouping hands by strength',
      content: `Not all 169 hands are created equal. Here's a rough breakdown:\n\nPremium hands (always raise): AA, KK, QQ, JJ, AKs, AKo. These are strong enough to play from any seat and in most situations.\n\nStrong hands (raise from most positions): TT, 99, AQs, AQo, AJs, KQs. Solid hands that can usually handle raises and post-flop pressure.\n\nPlayable hands (raise from middle and late position): medium pairs like 88 down to 22, suited aces like ATs to A2s, suited connectors like T9s and 87s, and broadway cards like KJo and QTo. These hands need position to be profitable.\n\nMarginal hands (button and blind defense only): weak suited hands, low broadways like K8o or J9o. You can play these cheaply from the right spots.\n\nTrash: 72o, 83o, 94o, and anything that isn't connected, isn't suited, and doesn't have a high card. Fold and wait for something better.`,
    },
    {
      heading: 'Position changes everything',
      content: `Your hand selection should widen dramatically as you move from early to late position. Here are rough guidelines for how many hands to open with:\n\nUTG: about 15%. Only your best hands survive the gauntlet of players behind you.\n\nHJ: about 18%. You can add some medium pairs and suited connectors.\n\nCO: about 25%. Now you're opening up with suited gappers and more broadway cards.\n\nBTN: about 45%. Nearly half of all hands. You'll have position the whole way, so you can play a lot more.\n\nSB: about 40%. Wide range, but you'll be out of position after the flop, which is a real drawback.\n\nBB: depends on who raised. You defend wider against late-position opens because their range is weaker.\n\nThe core idea: fewer hands from early position, more hands from late position. If you internalize nothing else from this chapter, internalize that. Use the Preflop Trainer to drill these ranges until they feel automatic.`,
    },
  ],
  quiz: [
    {
      id: 'ch6-q1',
      question: 'How many unique starting hands are there?',
      options: ['52', '169', '1,326', '2,652'],
      correctIndex: 1,
      explanation: '169 unique hands: 13 pairs + 78 suited + 78 offsuit.',
    },
    {
      id: 'ch6-q2',
      question: 'Why are suited hands stronger than offsuit versions of the same cards?',
      options: [
        'Suited hands have higher cards',
        'They can make flushes',
        'They always win at showdown',
        'They get better position',
      ],
      correctIndex: 1,
      explanation: 'Suited hands can make flushes, which adds significant extra equity.',
    },
    {
      id: 'ch6-q3',
      question: 'From which position should you play the widest range of hands?',
      options: ['UTG', 'Cutoff', 'Button', 'Big Blind'],
      correctIndex: 2,
      explanation: 'The Button plays the widest range because you act last on every post-flop street.',
    },
    {
      id: 'ch6-q4',
      question: 'Which of these is NOT a premium starting hand?',
      options: ['AA', 'KK', 'AKs', 'T9s'],
      correctIndex: 3,
      explanation: 'T9s is a decent suited connector but not premium. Premium is AA, KK, QQ, JJ, AKs, AKo.',
    },
  ],
  linkedTrainer: {
    href: '/train/preflop',
    label: 'Preflop Trainer',
  },
};
