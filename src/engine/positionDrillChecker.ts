import { PositionDrillScenario, PositionDrillResult } from '@/types/positionDrill';

const QUESTION_BANK: Omit<PositionDrillScenario, 'id'>[] = [
  // ORDER questions
  {
    question: 'In a 6-max game, who acts FIRST preflop?',
    options: ['Button', 'Small Blind', 'UTG', 'Big Blind'],
    correctIndex: 2,
    explanation: 'UTG (Under the Gun) is the first to act preflop, sitting to the left of the Big Blind.',
    category: 'order',
  },
  {
    question: 'Who acts LAST preflop?',
    options: ['Button', 'Small Blind', 'Big Blind', 'Cutoff'],
    correctIndex: 2,
    explanation: 'The Big Blind acts last preflop because they already have money in the pot and get to see everyone else\'s action.',
    category: 'order',
  },
  {
    question: 'Who acts FIRST on the flop, turn, and river?',
    options: ['UTG', 'Small Blind', 'Button', 'Whoever bet last'],
    correctIndex: 1,
    explanation: 'Postflop, the Small Blind acts first (or the next active player to the dealer\'s left if SB folded).',
    category: 'order',
  },
  {
    question: 'Who acts LAST postflop?',
    options: ['Big Blind', 'UTG', 'Button', 'Small Blind'],
    correctIndex: 2,
    explanation: 'The Button always acts last on every postflop street, which is why it\'s the most profitable seat.',
    category: 'order',
  },
  {
    question: 'What is the order of action preflop in 6-max?',
    options: [
      'SB → BB → UTG → HJ → CO → BTN',
      'UTG → HJ → CO → BTN → SB → BB',
      'BTN → SB → BB → UTG → HJ → CO',
      'BB → SB → UTG → HJ → CO → BTN',
    ],
    correctIndex: 1,
    explanation: 'Preflop action goes UTG → HJ → CO → BTN → SB → BB. The blinds act last preflop.',
    category: 'order',
  },
  {
    question: 'If the UTG and HJ both fold, who acts next preflop?',
    options: ['Small Blind', 'Button', 'Big Blind', 'Cutoff'],
    correctIndex: 3,
    explanation: 'After UTG and HJ fold, the Cutoff is next to act preflop.',
    category: 'order',
  },

  // CLASSIFICATION questions
  {
    question: 'Which position is considered "early position" in 6-max?',
    options: ['Button', 'Cutoff', 'UTG', 'Small Blind'],
    correctIndex: 2,
    explanation: 'UTG is the primary early position in 6-max. The HJ is sometimes grouped with early position too.',
    category: 'classification',
  },
  {
    question: 'Which positions are "late position"?',
    options: ['UTG and HJ', 'CO and BTN', 'SB and BB', 'HJ and CO'],
    correctIndex: 1,
    explanation: 'The Cutoff and Button are late position. They act later in the hand, giving them an information advantage.',
    category: 'classification',
  },
  {
    question: 'Which seat at the table is the most profitable long-term?',
    options: ['UTG', 'Big Blind', 'Button', 'Small Blind'],
    correctIndex: 2,
    explanation: 'The Button is the most profitable seat because you act last on every postflop street.',
    category: 'classification',
  },
  {
    question: 'Which seat is the LEAST profitable long-term?',
    options: ['UTG', 'Small Blind', 'Cutoff', 'HJ'],
    correctIndex: 1,
    explanation: 'The Small Blind loses the most money long-term. You post a forced bet and then act first on every postflop street.',
    category: 'classification',
  },
  {
    question: 'The Hijack (HJ) is classified as what type of position?',
    options: ['Early position', 'Middle position', 'Late position', 'Blind'],
    correctIndex: 1,
    explanation: 'The Hijack is typically considered middle position in 6-max. Some people group it with early position.',
    category: 'classification',
  },
  {
    question: 'What does "having position" on someone mean?',
    options: [
      'Sitting to their left (acting after them)',
      'Sitting to their right (acting before them)',
      'Having more chips than them',
      'Being in the blinds',
    ],
    correctIndex: 0,
    explanation: 'Having position means you act after your opponent, so you get to see what they do before making your decision.',
    category: 'classification',
  },

  // STRATEGY questions
  {
    question: 'Roughly what percentage of hands should you open from UTG?',
    options: ['5%', '15%', '30%', '45%'],
    correctIndex: 1,
    explanation: 'About 15% of hands from UTG. That\'s mostly big pairs, strong broadways, and some suited aces.',
    category: 'strategy',
  },
  {
    question: 'Roughly what percentage of hands should you open from the Button?',
    options: ['15%', '25%', '35%', '45%'],
    correctIndex: 3,
    explanation: 'About 45% of hands from the Button. Position advantage after the flop lets you play a much wider range.',
    category: 'strategy',
  },
  {
    question: 'Should you open ATo (Ace-Ten offsuit) from UTG in 6-max?',
    options: ['Yes, always raise', 'No, fold it', 'Call the big blind', 'Only if short-stacked'],
    correctIndex: 1,
    explanation: 'ATo is not strong enough to open from UTG. There are too many players behind who could have you dominated.',
    category: 'strategy',
  },
  {
    question: 'Should you open 87s (Eight-Seven suited) from the Button?',
    options: ['No, too weak', 'Yes, raise it', 'Only call', 'Depends on stack size'],
    correctIndex: 1,
    explanation: '87s is a solid open from the Button. Suited connectors play well with position, and you only need to get past two players.',
    category: 'strategy',
  },
  {
    question: 'You have QJs on the Button. Everyone folds to you. What should you do?',
    options: ['Fold', 'Limp (just call the BB)', 'Raise', 'Go all-in'],
    correctIndex: 2,
    explanation: 'QJs is a strong hand from the Button. Raise. Never limp from the Button when folded to you.',
    category: 'strategy',
  },
  {
    question: 'Why should you play fewer hands from early position?',
    options: [
      'The blinds are more expensive',
      'More players left to act behind you',
      'You can\'t see the flop from UTG',
      'The cards are weaker from early position',
    ],
    correctIndex: 1,
    explanation: 'With more players behind you, there\'s a higher chance someone has a strong hand. Plus you\'ll be out of position postflop.',
    category: 'strategy',
  },
  {
    question: 'You\'re in the Big Blind facing a Button open. How wide should you defend?',
    options: ['About 20%', 'About 35%', 'About 55-65%', 'Always fold'],
    correctIndex: 2,
    explanation: 'Defend roughly 55-65% against a Button open. Their range is wide, you\'re getting a price, and you close the action.',
    category: 'strategy',
  },
  {
    question: 'From the Small Blind, what\'s usually your best strategy facing a raise?',
    options: ['Always call', '3-bet or fold', 'Always fold', 'Limp behind'],
    correctIndex: 1,
    explanation: 'From the SB, 3-bet or fold is best. Calling puts you out of position with the BB still to act behind you.',
    category: 'strategy',
  },
  {
    question: 'Should you open 22 (pocket deuces) from UTG?',
    options: ['Yes, all pairs are premium', 'No, fold it', 'Only call, don\'t raise', 'Yes, raise it'],
    correctIndex: 3,
    explanation: 'Small pocket pairs like 22 are borderline from UTG but are generally included in most GTO opening ranges. They flop sets ~12% of the time.',
    category: 'strategy',
  },
  {
    question: 'You have KQo in the Hijack. UTG raised. What should you do?',
    options: ['3-bet (re-raise)', 'Call', 'Fold', 'Go all-in'],
    correctIndex: 1,
    explanation: 'KQo is strong enough to call an UTG raise from the HJ. It\'s not quite strong enough to 3-bet against an UTG range, which is tight.',
    category: 'strategy',
  },
  {
    question: 'Why is limping (just calling the big blind) considered bad?',
    options: [
      'It\'s against the rules',
      'It gives opponents cheap odds and signals weakness',
      'You can\'t win if you limp',
      'The dealer won\'t deal to limpers',
    ],
    correctIndex: 1,
    explanation: 'Limping lets everyone behind you see a cheap flop and tells the table you likely don\'t have a premium hand.',
    category: 'strategy',
  },
  {
    question: 'You\'re on the Button with A5s. UTG folds, HJ folds, CO folds. What do you do?',
    options: ['Fold', 'Call', 'Raise', 'Check'],
    correctIndex: 2,
    explanation: 'A5s is a clear open-raise from the Button when folded to you. It\'s well within the ~45% opening range.',
    category: 'strategy',
  },
  {
    question: 'Which hand benefits MORE from being in position: AA or 76s?',
    options: ['AA', '76s', 'They benefit equally', 'Neither benefits'],
    correctIndex: 1,
    explanation: '76s benefits much more from position. AA is strong enough to profit from any position. 76s needs to see flops cheaply and navigate postflop with information, which position provides.',
    category: 'strategy',
  },
  {
    question: 'You have JJ in the Cutoff. The Hijack raised. What\'s your best play?',
    options: ['Fold', 'Call', '3-bet', 'Go all-in'],
    correctIndex: 2,
    explanation: 'JJ is strong enough to 3-bet against a HJ open from the CO. You want to build the pot and narrow the field.',
    category: 'strategy',
  },
  {
    question: 'What\'s the main reason the Button is so profitable?',
    options: [
      'You get dealt better cards',
      'You act last on every postflop street',
      'You don\'t have to post blinds',
      'You can see the dealer\'s cards',
    ],
    correctIndex: 1,
    explanation: 'Acting last on every postflop street gives you maximum information before making decisions. That\'s a huge edge.',
    category: 'strategy',
  },
];

export function generatePositionDrillScenario(): PositionDrillScenario {
  const idx = Math.floor(Math.random() * QUESTION_BANK.length);
  const q = QUESTION_BANK[idx];
  return {
    ...q,
    id: Math.random().toString(36).slice(2),
  };
}

export function checkPositionDrill(
  scenario: PositionDrillScenario,
  playerAnswerIndex: number
): PositionDrillResult {
  return {
    scenario,
    playerAnswerIndex,
    isCorrect: playerAnswerIndex === scenario.correctIndex,
  };
}
