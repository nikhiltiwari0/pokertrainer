import { Chapter } from '@/types/course';

export const chapter03: Chapter = {
  slug: 'betting-rounds',
  title: 'The Deal & Betting Rounds',
  description: 'Walk through a full hand from preflop to river, street by street.',
  order: 3,
  sections: [
    {
      heading: 'Preflop',
      content: `The small blind and big blind post their forced bets. Then everyone gets two cards face down.\n\nBetting starts with the player to the left of the big blind. This seat is called "Under the Gun" (UTG) because you're first to act with no information about what anyone else wants to do. From UTG, you can fold (toss your cards), call (match the big blind), or raise (put in more than the big blind, minimum 2x).\n\nAction moves clockwise around the table. The big blind acts last preflop, and if nobody raised, they can simply "check" (stay in without adding money) since they already have a bet in.`,
      illustration: 'betting-rounds-flow',
    },
    {
      heading: 'The flop',
      content: `After preflop betting wraps up, three community cards land face-up in the middle of the table. This is the flop.\n\nNow a new betting round starts, but the order changes. From the flop onward, the first active player to the left of the dealer button goes first. This time around, players can check (pass without betting) if nobody has bet yet, or bet, call, raise, or fold.\n\nThe flop is where things get real. You now see 5 of the 7 total cards that will make up your final hand. Most of the time you'll know pretty quickly whether you like your spot or not.`,
    },
    {
      heading: 'The turn',
      content: `A fourth community card comes out. Some players call it "fourth street."\n\nAnother round of betting follows the same pattern as the flop. By now the pot has usually grown enough that bets start to feel more meaningful. If you're on a draw, you only have one card left to hit it. If you have a made hand, you're hoping nothing bad shows up on the river.\n\nThe turn is where a lot of players make expensive mistakes, either by chasing draws they can't afford or by getting aggressive with hands that aren't as strong as they thought.`,
    },
    {
      heading: 'The river',
      content: `The fifth and final community card. All the cards are out. No more hoping to improve.\n\nOne last round of betting happens. After this, if multiple players are still in, they show their cards (showdown) and the best five-card hand wins everything. If only one player is left at any point because everyone else folded, they take the pot without revealing their hand.\n\nRiver decisions tend to be the biggest in terms of chips. It's also where bluffing reaches peak tension, because there are no more cards to save anyone.`,
    },
    {
      heading: 'How pots grow (and why it matters)',
      content: `The pot builds a little more with each betting round. What starts as just the blinds can balloon quickly if people keep betting and raising.\n\nHere's an important mental model: early streets are cheap, later streets are expensive. A mistake on the flop might cost you a small bet. The same mistake on the river can cost you your whole stack. This is why experienced players think carefully before putting lots of money in: once the pot gets big, it's hard to let go of it, even when you probably should.\n\nA good rule of thumb: if you're not comfortable putting in big bets on the turn and river with your hand, think twice about building the pot on the flop.`,
    },
  ],
  quiz: [
    {
      id: 'ch3-q1',
      question: 'Who acts first in the preflop betting round?',
      options: ['The dealer', 'The small blind', 'The big blind', 'The player left of the big blind (UTG)'],
      correctIndex: 3,
      explanation: 'Preflop, the player to the left of the big blind (UTG) acts first.',
    },
    {
      id: 'ch3-q2',
      question: 'How many community cards come out on the flop?',
      options: ['1', '2', '3', '4'],
      correctIndex: 2,
      explanation: 'Three community cards are dealt at once on the flop.',
    },
    {
      id: 'ch3-q3',
      question: 'After the flop, who acts first?',
      options: ['UTG', 'The big blind', 'The first active player left of the dealer', 'The last raiser'],
      correctIndex: 2,
      explanation: 'Post-flop, the first active player left of the dealer button acts first.',
    },
    {
      id: 'ch3-q4',
      question: 'What happens if everyone folds to a bet on the turn?',
      options: [
        'The river is still dealt',
        'The bettor wins the pot without showing cards',
        'The hand is a draw',
        'Cards are reshuffled',
      ],
      correctIndex: 1,
      explanation: 'If all players fold, the remaining player takes the pot without showing their hand.',
    },
  ],
};
