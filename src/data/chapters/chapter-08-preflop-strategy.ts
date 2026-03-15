import { Chapter } from '@/types/course';

export const chapter08: Chapter = {
  slug: 'preflop-strategy',
  title: 'Preflop Strategy',
  description: 'Opening ranges, 3-betting, facing raises, and defending your blinds.',
  order: 8,
  sections: [
    {
      heading: 'Opening ranges (RFI)',
      content: `RFI stands for "Raise First In." It means you're the first person to put money in the pot (besides the blinds). When it folds to you, you either raise or fold. There's no in-between.\n\nThe biggest thing to remember: never just call the big blind (called "limping"). Limping gives everyone behind you great odds to see the flop cheaply, and it signals weakness. If your hand is good enough to play, it's good enough to raise with.\n\nHow wide you open depends on your seat:\n\nFrom UTG, play about 15% of hands. That's your premium stuff: big pairs, strong broadways, some suited aces.\n\nFrom the HJ, bump it up to about 18%. Add in smaller pairs and some suited connectors.\n\nFrom the CO, roughly 25%. Now you can include suited gappers and more broadway combos.\n\nFrom the BTN, nearly 45%. You'll have position after the flop, so you can afford to play a lot.\n\nFrom the SB, about 40%. Wide, but you'll be out of position, which is a tradeoff.`,
    },
    {
      heading: '3-betting',
      content: `A 3-bet is when someone opens with a raise and you raise them again. (The blinds are the "first bet," the open-raise is the "second bet," your re-raise is the "third bet.") It's one of the most important weapons in your arsenal.\n\nYou 3-bet for two reasons.\n\nFor value: with hands like AA, KK, QQ, AKs, you want to build a bigger pot before the flop because you're ahead of their opening range.\n\nAs a bluff: with hands like A5s, A4s, or small suited connectors, you 3-bet to win the pot right there. If they fold, great. If they call, you have a hand with some potential. And either way, it keeps your range balanced so opponents can't assume you always have the goods.\n\nWho you're 3-betting against matters. If someone opens from UTG, they have a strong range, so only 3-bet your best hands. If someone opens from the BTN, their range is wide and you can 3-bet them more aggressively.`,
    },
    {
      heading: 'Facing a raise',
      content: `Most of the time when someone raises before you, you fold. That's not exciting, but it's correct. The majority of hands just aren't strong enough to continue against a raise.\n\nWhen you do continue, you either call or 3-bet. Call with hands that play well after the flop (suited connectors, medium pairs, suited aces). These hands don't need to win the pot right now. They make their money by flopping well and extracting value over multiple streets.\n\n3-bet with your strongest hands and selected bluffs (as described above).\n\nPay attention to who raised and from where. An UTG raise represents a much narrower, stronger range than a CO or BTN raise. Adjust your continuing range accordingly. You might 3-bet AQo against a BTN open, but just call (or even fold) with it against an UTG open.`,
    },
    {
      heading: 'Defending the big blind',
      content: `The BB is a special spot because you already have a full big blind invested. That gives you a discount on calling raises, which means you should defend with a wider range than you might expect.\n\nAgainst a BTN open, you can defend roughly 55-65% of hands. The button's range is wide, you're getting a good price, and you close the action (nobody can squeeze behind you).\n\nAgainst a CO open, defend maybe 40-50%.\n\nAgainst an UTG open, tighten up to 20-25%. They have the goods.\n\nThe Small Blind is different. From the SB, your best play is usually to 3-bet or fold. Calling from the SB is tricky because you'll be out of position against both the raiser and the BB (who might squeeze). When you do call, you're setting yourself up for tough spots on later streets.`,
    },
    {
      heading: 'Drilling these ranges',
      content: `Reading about ranges is one thing. Making the right call in two seconds when you're looking at your cards is another. That gap between knowing and doing is where the Preflop Trainer comes in.\n\nThe trainer puts you in specific preflop spots (RFI, facing a raise, facing a 3-bet) and asks what to do. After each hand, it shows you the GTO-correct play along with the full hand matrix, so you can see exactly which hands go in the raise, call, and fold buckets.\n\nDo a hundred hands. Then another hundred. It should feel automatic after a while. You shouldn't have to think about whether to open A9s from the CO. You should just know.`,
    },
  ],
  quiz: [
    {
      id: 'ch8-q1',
      question: 'What does RFI stand for?',
      options: ['Raise For Information', 'Raise First In', 'Re-raise For Initiative', 'Random Fold Input'],
      correctIndex: 1,
      explanation: 'RFI = "Raise First In," meaning you\'re first to put in a raise.',
    },
    {
      id: 'ch8-q2',
      question: 'Why is limping (just calling the big blind) a bad play?',
      options: [
        'It\'s against the rules',
        'It gives opponents cheap odds and signals weakness',
        'It costs too much money',
        'The dealer won\'t allow it',
      ],
      correctIndex: 1,
      explanation: 'Limping lets everyone see a cheap flop and tells them you don\'t have a strong hand.',
    },
    {
      id: 'ch8-q3',
      question: 'Should you 3-bet tighter or wider against an UTG open vs. a BTN open?',
      options: ['Wider', 'Tighter', 'The same', 'Never 3-bet vs UTG'],
      correctIndex: 1,
      explanation: 'UTG opens a narrow, strong range. You need stronger hands to play back at them.',
    },
    {
      id: 'ch8-q4',
      question: 'What should the Small Blind mostly do when facing a raise?',
      options: ['Call', '3-bet or fold', 'Always fold', 'Limp along'],
      correctIndex: 1,
      explanation: 'Calling from the SB puts you out of position for the whole hand. Better to 3-bet or fold.',
    },
  ],
  linkedTrainer: {
    href: '/train/preflop',
    label: 'Preflop Trainer',
  },
};
