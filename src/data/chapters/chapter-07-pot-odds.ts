import { Chapter } from '@/types/course';

export const chapter07: Chapter = {
  slug: 'pot-odds-math',
  title: 'Pot Odds & Math',
  description: 'The math that separates breakeven players from winners. Easier than it sounds.',
  order: 7,
  sections: [
    {
      heading: 'Pot odds in plain language',
      content: `Pot odds answer one question: "Is this call worth it?"\n\nHere's the idea. The pot has money in it. Your opponent bets. Now you need to decide whether to call. Pot odds compare the cost of calling to the total pot you'd win.\n\nThe formula: Call Amount / (Pot + Opponent's Bet + Your Call)\n\nSay the pot is 100, your opponent bets 50, and you'd need to call 50 to stay in. Your pot odds are 50 / (100 + 50 + 50) = 50/200 = 25%. That means you need to win this hand at least 25% of the time for calling to be profitable.\n\nIf your hand wins more than 25% of the time, you call. If it wins less, you fold. That's it. The rest of this chapter is just about figuring out that win percentage.`,
      illustration: 'pot-odds-visual',
    },
    {
      heading: 'Counting outs',
      content: `An "out" is any card left in the deck that will make your hand good enough to win. Counting outs is how you figure out your chances.\n\nHere are the common draws and their out counts:\n\nFlush draw (you have four cards of the same suit): 9 outs. There are 13 cards of each suit in the deck, you see 4, so 9 remain.\n\nOpen-ended straight draw (like 6-7-8-9, needing a 5 or a 10): 8 outs. Four 5s and four 10s.\n\nGutshot straight draw (like 6-7-_-9-10, needing an 8): 4 outs. Only four 8s.\n\nTwo overcards (like A-K on a low board): 6 outs. Three aces and three kings.\n\nFlush draw plus an overcard: 12 outs. Now you're cooking.\n\nOne thing to keep in mind: not all outs are clean. If you're drawing to a flush but a card that completes your flush also pairs the board, your opponent might have a full house. In sketchy situations, discount your outs by 1 or 2.`,
    },
    {
      heading: 'The Rule of 2 and 4',
      content: `This is the shortcut that makes poker math fast enough to do at the table.\n\nOn the flop (two cards still to come): multiply your outs by 4.\nOn the turn (one card to come): multiply your outs by 2.\n\nThat gives you a rough equity percentage. Examples:\n\nFlush draw on the flop: 9 outs x 4 = about 36% equity. You'll make your flush a little over a third of the time.\n\nFlush draw on the turn: 9 outs x 2 = about 18%. With only one card coming, your odds drop by half.\n\nOpen-ended straight draw on the flop: 8 x 4 = about 32%.\n\nGutshot on the turn: 4 x 2 = about 8%. Not great.\n\nIt's not perfectly accurate (the exact numbers are slightly different), but it's close enough for in-game decisions. Better to do fast approximate math than no math at all.`,
    },
    {
      heading: 'Putting it together',
      content: `Here's the full process:\n\n1. Figure out your pot odds (call / total pot).\n2. Count your outs.\n3. Estimate your equity (outs x 4 on the flop, outs x 2 on the turn).\n4. Compare. Equity higher than pot odds? Call. Lower? Fold.\n\nWorked example: you have a flush draw on the turn. The pot is 200, opponent bets 100.\n\nPot odds: 100 / (200 + 100 + 100) = 100/400 = 25%. You need 25% equity to call.\nOuts: 9 (flush draw).\nEquity: 9 x 2 = 18%.\n18% is less than 25%, so this is a fold. The price is too high for the odds you're getting.\n\nIf the opponent had bet 50 instead? Pot odds = 50 / (200 + 50 + 50) = 50/300 = about 17%. Now your 18% equity beats the price, and calling becomes profitable.\n\nPractice this in the Pot Odds trainer until you can do it without thinking.`,
    },
    {
      heading: 'Implied odds',
      content: `Sometimes the strict pot odds say fold, but you call anyway because you expect to win a lot of extra money if you hit your hand. This is "implied odds."\n\nSay you have a gutshot straight draw. You've got 4 outs, roughly 8% equity, and the pot odds need 15%. By the numbers, it's a fold. But if your opponent has a hand they love (like top pair, top kicker) and they'll pay off a big bet when your straight gets there, those future winnings can make the call worthwhile.\n\nImplied odds are higher when your draw is hidden (opponents won't see it coming), stacks are deep (more money to win later), and your opponent is the type who pays people off.\n\nImplied odds are lower when the draw is obvious (like a fourth flush card on the board), stacks are short, or your opponent is good enough to fold when the scary card hits.\n\nDon't use implied odds as an excuse to call every draw. But do factor them in when the situation is right.`,
    },
  ],
  quiz: [
    {
      id: 'ch7-q1',
      question: 'Pot is 150, opponent bets 50. What are your pot odds?',
      options: ['20%', '25%', '33%', '50%'],
      correctIndex: 0,
      explanation: '50 / (150 + 50 + 50) = 50/250 = 20%.',
    },
    {
      id: 'ch7-q2',
      question: 'How many outs does a flush draw have?',
      options: ['4', '8', '9', '12'],
      correctIndex: 2,
      explanation: 'A flush draw has 9 outs (13 cards of the suit minus the 4 you see).',
    },
    {
      id: 'ch7-q3',
      question: 'You have 10 outs on the flop. Using the Rule of 4, what is your approximate equity?',
      options: ['10%', '20%', '30%', '40%'],
      correctIndex: 3,
      explanation: 'On the flop: 10 outs x 4 = roughly 40% equity.',
    },
    {
      id: 'ch7-q4',
      question: 'Your equity is 18% and pot odds are 25%. What should you do?',
      options: ['Call', 'Fold', 'Raise', 'Check'],
      correctIndex: 1,
      explanation: 'Your equity (18%) is less than the price you need to pay (25%), so folding is correct.',
    },
  ],
  linkedTrainer: {
    href: '/train/outs-equity',
    label: 'Outs & Equity Drill',
  },
};
