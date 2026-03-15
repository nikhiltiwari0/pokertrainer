import { Chapter } from '@/types/course';

export const chapter05: Chapter = {
  slug: 'betting-actions',
  title: 'Betting Actions',
  description: 'Fold, check, call, bet, raise, all-in: what they are and when to use each one.',
  order: 5,
  sections: [
    {
      heading: 'Your six options',
      content: `Every time it's your turn, you pick from one of these:\n\nFold: you're out. Your cards go into the muck and you forfeit any money you've put in.\n\nCheck: you pass your turn without putting in chips, but you stay in the hand. You can only check if nobody has bet in the current round.\n\nCall: you match whatever the current bet is.\n\nBet: you put chips in when nobody else has bet yet in the current round. You're "opening" the action.\n\nRaise: someone bet, and you put in even more. The minimum raise is the size of the previous bet or raise.\n\nAll-in: you shove all your remaining chips into the pot. You might do this because you have a monster hand, because you want to apply maximum pressure, or because you don't have enough chips to make a normal raise.`,
    },
    {
      heading: 'How much to bet',
      content: `The size of your bet communicates something, whether you want it to or not. Players talk about bet sizes as fractions of the pot:\n\nA third of the pot is a small bet. It's cheap for opponents to call, so it works best when you're trying to get thin value or make a low-cost bluff.\n\nHalf the pot is the "default" bet for most situations. Not too big, not too small.\n\nTwo-thirds to full pot is an aggressive bet. It puts pressure on draws and forces opponents to make tough decisions.\n\nOverbets (more than the pot) are rare but powerful. They say "I either have it or I don't" and put opponents in an awkward spot.\n\nHere's the thing though: you don't want to use a completely different size every time depending on your hand. If you always bet big with strong hands and small with bluffs, observant opponents will figure that out fast. Try to use similar sizes in similar spots regardless of what you're holding.`,
    },
    {
      heading: 'Betting vs. checking: when to do which',
      content: `Bet when you have a hand that wants the pot to grow. Either you think you're ahead and want to get paid (value bet), or you think your opponent will fold something better (bluff), or you have a draw and want to build the pot for when you get there (semi-bluff).\n\nCheck when you're unsure where you stand. If you have a medium-strength hand and don't know if your opponent is stronger or weaker, checking keeps the pot manageable. You can also check with a strong hand if you want to let an aggressive opponent bet into you (called "trapping" or "slow-playing").\n\nA common mistake beginners make: betting when they have no idea what they want to happen. Before you click "bet," ask yourself, "What hands do I want to call me?" If you can't answer that, checking is probably better.`,
    },
    {
      heading: 'Raising and why it\'s so powerful',
      content: `Raising does several things at once. It builds the pot when you're ahead. It can force better hands to fold (bluff-raising). It tells you something about your opponent based on how they respond. And it can narrow the field by scaring off players who might otherwise tag along.\n\nStandard preflop raise sizes are about 2.5 to 3 times the big blind. If someone raises and you want to re-raise (a "3-bet"), roughly 3x their raise is typical.\n\nPost-flop, raise sizes are usually relative to the pot. A raise to 2.5-3x the bet is standard. Going bigger puts more pressure on but also means you're risking more chips.\n\nOne last thing: never "min-raise" (raise the absolute minimum) unless you have a specific reason. It gives opponents too good a price to call and doesn't accomplish much.`,
    },
  ],
  quiz: [
    {
      id: 'ch5-q1',
      question: 'When can you check?',
      options: [
        'Anytime you want',
        'Only when no one has bet in the current round',
        'Only from the big blind',
        'Only on the river',
      ],
      correctIndex: 1,
      explanation: 'You can only check when nobody has put in a bet during the current betting round.',
    },
    {
      id: 'ch5-q2',
      question: 'What is a "semi-bluff"?',
      options: [
        'A small bluff',
        'Betting with a hand that could improve, like a draw',
        'Bluffing on the river only',
        'Calling with a weak hand',
      ],
      correctIndex: 1,
      explanation: 'A semi-bluff is betting with a draw. You can win if they fold now, or if you hit your card later.',
    },
    {
      id: 'ch5-q3',
      question: 'The pot is 200 chips. What is a "half-pot" bet?',
      options: ['50 chips', '100 chips', '200 chips', '400 chips'],
      correctIndex: 1,
      explanation: 'Half of 200 is 100 chips.',
    },
  ],
};
