import { Chapter } from '@/types/course';

export const chapter11: Chapter = {
  slug: 'glossary',
  title: 'Poker Terminology',
  description: 'A complete glossary of poker terms every player should know.',
  order: 11,
  sections: [
    {
      heading: 'A through C',
      content: `Action: it's your turn, or it refers to the overall betting going on in a hand. "The action's on you."\n\nAll-in: you push all your remaining chips into the pot. You might do this because you have a monster, because you want maximum pressure, or because you're short-stacked and it's your only option.\n\nBackdoor: needing both the turn and river to complete a draw. If you have two hearts and one heart is on the flop, you have a backdoor flush draw. You need running hearts.\n\nBad beat: losing a hand where you were a heavy favorite. You had aces, they had king-nine, and two nines showed up. That's a bad beat.\n\nBig blind (BB): the larger of the two forced bets posted before the deal. Also refers to the player sitting in that seat. Stakes are measured in big blinds.\n\nBlocker: a card in your hand that reduces the likelihood your opponent has a specific holding. If you have the ace of spades, it's harder for them to have a spade flush.\n\nBoard: the community cards in the middle of the table. The flop, turn, and river together make up the board.\n\nBroadway: any card ten or higher (T, J, Q, K, A). A "broadway straight" is A-K-Q-J-T, the highest possible straight.\n\nButton (BTN): the dealer position. Best seat at the table because you act last on every postflop street.\n\nBuy-in: the amount of money you bring to a game or pay to enter a tournament.\n\nC-bet (continuation bet): when the preflop raiser bets again on the flop. You raised preflop, and you're continuing your aggression.\n\nCall: matching the current bet to stay in the hand.\n\nCheck: passing your turn without putting in chips. You can only check when nobody has bet yet in the current round.\n\nCheck-raise: checking to your opponent, letting them bet, and then raising. It's a strong, sometimes tricky, move.\n\nConnectors: two cards next to each other in rank, like 8-9 or J-T. "Suited connectors" means they share a suit.`,
    },
    {
      heading: 'D through G',
      content: `Dead money: chips sitting in the pot from players who already folded. When you steal blinds, you're picking up dead money.\n\nDonk bet: betting into the preflop raiser when you were the caller. The name isn't flattering, but it can actually be a useful play in some situations.\n\nDraw: a hand that isn't complete yet but could become strong with the right card. A flush draw needs one more card of its suit. A straight draw needs one more card to connect.\n\nDry board: a flop with cards that don't connect well. K-7-2 with three different suits is bone dry. Few draws are possible.\n\nEquity: your percentage chance of winning the pot if all remaining cards were dealt out. If you're a 60% favorite, you have 60% equity.\n\nEV (expected value): the average amount a decision will win or lose over many repetitions. A +EV play makes money long-term, even if it loses this particular time.\n\nFish: a weak player. Not a nice label, but you'll hear it at the tables.\n\nFloat: calling a bet (usually a c-bet) with a weak hand, planning to bluff on a later street when your opponent gives up.\n\nFold: tossing your cards away and giving up on the pot. Any chips you already put in are gone.\n\nFold equity: the probability that your opponent folds if you bet or raise. A bluff needs fold equity to work.\n\nGTO (Game Theory Optimal): a strategy that's mathematically balanced so it can't be exploited. You won't lose money against any opponent playing GTO, though you might miss exploitation opportunities.\n\nGutshot: an inside straight draw. You need one specific rank to fill the gap. Like holding 6-7 on a 9-T board and needing an 8. Four outs.`,
    },
    {
      heading: 'H through O',
      content: `Heads-up: just two players in a hand, or a game format with only two players.\n\nHole cards: your two private cards that only you can see.\n\nImplied odds: a modification of pot odds that accounts for money you expect to win on future streets if you hit your draw. The pot odds might say fold, but if your opponent will pay you off big when you get there, implied odds can make calling worthwhile.\n\nIn position: you act after your opponent. This is a significant advantage because you get to see what they do before you decide.\n\nKicker: the highest unpaired side card in your hand, used to break ties. If you both have a pair of kings, the player with the better kicker wins.\n\nLimp: just calling the big blind preflop instead of raising. Generally a bad play because it gives everyone behind you a cheap look at the flop.\n\nMultiway: a pot with three or more players still in. Bluffs work less often multiway because there are more hands to beat.\n\nNit: someone who plays extremely tight and only puts money in with the absolute best hands. Predictable and not much fun to play against.\n\nNuts: the best possible hand given the current board. If the board is A-K-Q-J-3 with no flush possible, someone holding a ten has the nuts (broadway straight).\n\nOESD (open-ended straight draw): four cards in a row, needing one card on either end to complete the straight. Like 6-7-8-9 needing a 5 or a 10. Eight outs.\n\nOffsuit: your two hole cards are different suits. Notated with an "o" like AKo.\n\nOut: any card left in the deck that would improve your hand to (likely) the best hand.\n\nOvercard: a card in your hand that's higher than any card on the board. If you hold AK and the board is 9-7-3, both your cards are overcards.\n\nOverpair: a pocket pair higher than every card on the board. Holding QQ on a J-8-4 board.`,
    },
    {
      heading: 'P through Z',
      content: `Pocket pair: two hole cards of the same rank. Pocket aces (AA), pocket sevens (77), etc.\n\nPolarized: a range that's split between very strong hands and bluffs, with few medium-strength hands. When someone bets big on the river, their range is often polarized.\n\nPot odds: the ratio of what you need to call versus the total pot you'd win. If you need to call 50 into a pot of 200, your pot odds are 50/250 = 20%.\n\nPreflop: the first betting round. You've seen your hole cards but no community cards yet.\n\nRainbow: a board where all the cards are different suits, so no flush draws are possible.\n\nRange: the complete set of hands a player could have in a given situation. You don't put someone on one specific hand; you think about their range of possible hands and narrow it down as the hand progresses.\n\nRiver: the fifth and final community card.\n\nSemi-bluff: betting with a draw. You probably don't have the best hand right now, but if they fold, great. If they call, you can still improve.\n\nSet: three of a kind when you hold a pocket pair and one matching card is on the board. Holding 77 on a 7-K-3 board. Sets are disguised and very profitable.\n\nShowdown: after all betting is done, the remaining players flip their cards over to see who wins.\n\nSlow play: playing a strong hand passively to let your opponent catch up or hang themselves. Checking with a full house hoping they'll bluff into you.\n\nSuited: your two hole cards share a suit. Notated with an "s" like AKs. Worth more than offsuit because of flush potential.\n\nTilt: emotional, frustrated play. The biggest bankroll killer in poker. Covered in detail in Chapter 10.\n\nTrips: three of a kind when one card is in your hand and two matching cards are on the board. Different from a set because it's less disguised.\n\nTurn: the fourth community card, dealt after flop betting is complete.\n\nUnder the gun (UTG): the first player to act preflop. Toughest position because everyone else gets to act after you.\n\nValue bet: betting with a hand you believe is best, wanting to get called by something worse.\n\nVillain: your opponent. Used in hand analysis discussions. "The villain raised to three times the big blind."\n\nWet board: a board with lots of possible draws. Something like 9-8-7 with two hearts. Straight draws, flush draws, combo draws everywhere.`,
    },
  ],
  quiz: [
    {
      id: 'ch11-q1',
      question: 'What does GTO stand for?',
      options: ['Get The Odds', 'Game Theory Optimal', 'Go To Open', 'Grand Total Outcome'],
      correctIndex: 1,
      explanation: 'GTO stands for Game Theory Optimal, a balanced strategy that can\'t be exploited.',
    },
    {
      id: 'ch11-q2',
      question: 'What is the "nuts"?',
      options: [
        'A crazy bluff',
        'The worst possible hand',
        'The best possible hand given the board',
        'A pair of aces',
      ],
      correctIndex: 2,
      explanation: 'The nuts is the best possible hand anyone could have given the current board.',
    },
    {
      id: 'ch11-q3',
      question: 'What does "polarized" mean in poker?',
      options: [
        'Playing only suited hands',
        'A range of very strong hands and bluffs with few medium hands',
        'Betting the same amount every time',
        'Playing from the blinds only',
      ],
      correctIndex: 1,
      explanation: 'A polarized range has the strongest hands and bluffs, skipping the medium hands in between.',
    },
    {
      id: 'ch11-q4',
      question: 'What is the difference between a set and trips?',
      options: [
        'There is no difference',
        'A set is from a pocket pair plus one board card; trips is one hole card plus two board cards',
        'A set is three cards on the board; trips is in your hand',
        'Trips is better than a set',
      ],
      correctIndex: 1,
      explanation: 'A set comes from holding a pocket pair with one matching card on the board. Trips comes from one card in your hand matching two on the board. Sets are more disguised.',
    },
  ],
};
