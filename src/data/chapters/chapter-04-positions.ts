import { Chapter } from '@/types/course';

export const chapter04: Chapter = {
  slug: 'positions',
  title: 'Table Positions',
  description: 'Position is the single biggest edge in poker. Here\'s why, and how to use it.',
  order: 4,
  sections: [
    {
      heading: 'What position means',
      content: `Position is where you sit relative to the dealer button, and it determines when you have to act in each betting round. The later you act, the better, because you get to watch everyone else make their decisions first.\n\nIn a 6-player game (called "6-max," which is the most common online format), the six seats are:\n\n- UTG (Under the Gun): first to act preflop. Hardest seat at the table.\n- HJ (Hijack): second to act. Still tough.\n- CO (Cutoff): one before the button. Starting to get comfortable.\n- BTN (Button): the dealer seat. Best position in the game.\n- SB (Small Blind): posts the small forced bet. Has position preflop but acts first after the flop.\n- BB (Big Blind): posts the big forced bet. Gets to act last preflop but first post-flop.`,
      illustration: 'position-diagram',
    },
    {
      heading: 'Why acting last is such a big deal',
      content: `Imagine you're at a table and everyone has to say their answer to a question before you. You'd know a lot more about the situation than the person who goes first, right? Same thing in poker.\n\nWhen you act last, you see whether opponents checked (usually a sign of weakness) or bet (usually strength, or at least pretending to be). That information lets you make smarter decisions. You can bluff more effectively because you know who's shown weakness. You can value bet more precisely because you know who's interested in the pot. You can control the pot size by checking behind when you don't want it to grow.\n\nNone of that is available to the person who acts first. They're guessing. You're reacting to real information.`,
    },
    {
      heading: 'Early, late, and blind positions',
      content: `People group the seats into three buckets:\n\nEarly position (UTG, HJ): you should play tight here. Lots of players behind you means a higher chance someone wakes up with a strong hand. Stick to your best cards.\n\nLate position (CO, BTN): you can play a lot more hands. Fewer players to worry about, and if you get called, you'll have position for the rest of the hand. The button can profitably play close to half of all starting hands.\n\nBlinds (SB, BB): a mixed bag. You've already got money in the pot, which gives you a discount on calling raises. But after the flop, you act first every round, which is a real disadvantage. The SB is actually the worst seat at the table in terms of long-term profitability.`,
    },
    {
      heading: 'Why the button prints money',
      content: `Professional players make the majority of their profit from the button. Not because they get better cards there (cards are random), but because the positional advantage is that strong.\n\nFrom the button, you act last on every single post-flop street. You see what everyone else does before you commit a single chip. You can steal the blinds when everyone folds to you. You can call raises more liberally because you know you'll have position the rest of the way.\n\nIf you took two equally skilled players and only changed their positions, the one on the button would win more money over time. That's how much position matters. When you're learning, pay special attention to how you play on the button. It's the seat where good habits pay off the most.`,
    },
  ],
  quiz: [
    {
      id: 'ch4-q1',
      question: 'Which position is the most profitable in poker?',
      options: ['UTG', 'Big Blind', 'Button (BTN)', 'Small Blind'],
      correctIndex: 2,
      explanation: 'The Button is the most profitable because you act last on every post-flop street.',
    },
    {
      id: 'ch4-q2',
      question: 'Why should you play fewer hands from UTG?',
      options: [
        'Because UTG has to post a blind',
        'Because there are many players left to act behind you',
        'Because UTG can\'t raise',
        'Because UTG is closest to the dealer',
      ],
      correctIndex: 1,
      explanation: 'With many players still to act, there\'s a higher chance someone has you beat.',
    },
    {
      id: 'ch4-q3',
      question: 'What is the main advantage of acting last?',
      options: [
        'You can bet more money',
        'You see what opponents do before deciding',
        'You get better cards',
        'You pay smaller blinds',
      ],
      correctIndex: 1,
      explanation: 'Acting last gives you information from every other player before your turn.',
    },
  ],
  linkedTrainer: {
    href: '/train/position',
    label: 'Position Drill',
  },
};
