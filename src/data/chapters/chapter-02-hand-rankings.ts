import { Chapter } from '@/types/course';

export const chapter02: Chapter = {
  slug: 'hand-rankings',
  title: 'Hand Rankings',
  description: 'The ten poker hands from Royal Flush down to High Card, plus kickers and odds.',
  order: 2,
  sections: [
    {
      heading: 'The ten hands, strongest to weakest',
      content: `Every five-card poker hand fits into one of these ten categories. If two players have different categories, the higher one wins. Simple as that.\n\n1. Royal Flush: A, K, Q, J, 10, all the same suit. You'll probably never see one in person.\n\n2. Straight Flush: five cards in a row, same suit. Like 9-8-7-6-5, all hearts.\n\n3. Four of a Kind (quads): four cards of the same rank, like four kings.\n\n4. Full House: three of a kind plus a pair. Players call this a "boat." Example: three queens and two eights.\n\n5. Flush: five cards of the same suit that aren't in sequence. Ace-high flushes are the strongest.\n\n6. Straight: five cards in a row with mixed suits. Like 9-8-7-6-5 across different suits.\n\n7. Three of a Kind: three cards of the same rank.\n\n8. Two Pair: two separate pairs, like jacks and fives.\n\n9. One Pair: two cards of the same rank.\n\n10. High Card: nothing. Your highest card is all you've got.`,
      illustration: 'hand-rankings-chart',
    },
    {
      heading: 'The ones people mix up',
      content: `A flush beats a straight. This one trips people up constantly. Think of it this way: it's harder to get five cards of the same suit than five in a row, so the flush ranks higher.\n\nA full house beats a flush. Three of a kind with a pair on top of it is genuinely hard to make, and it beats all the one-category hands.\n\nSuits are never ranked against each other. If two players both have a flush of the same values but different suits, it's a tie. Spades aren't "better" than hearts, despite what some people think.\n\nThe ace swings both ways in straights. A-K-Q-J-10 is the highest straight (a "broadway"), and A-2-3-4-5 is the lowest (a "wheel"). But you can't wrap around: Q-K-A-2-3 isn't a straight.`,
    },
    {
      heading: 'Kickers matter more than you think',
      content: `When two players have the same hand type, you look at side cards called "kickers" to break the tie.\n\nSay you have A-K and your opponent has A-Q. The board is A-8-7-4-2. You both have a pair of aces, but your king kicker beats their queen kicker. You win.\n\nKickers come up constantly with one-pair hands. If you have A-K and the board is A-J-9-5-2, your hand is actually a pair of aces with a king kicker. If your opponent has A-T, same pair of aces, but your king beats their ten.\n\nThis is one reason good players prefer hands with high kickers. A-K isn't just strong because it can make top pair. It's strong because when it does pair, the kicker is almost always good enough to win.`,
    },
    {
      heading: 'How often each hand shows up',
      content: `Some rough numbers to give you a feel for rarity:\n\n- Royal Flush: roughly 1 in 650,000 hands\n- Straight Flush: about 1 in 72,000\n- Four of a Kind: about 1 in 4,200\n- Full House: about 1 in 694\n- Flush: about 1 in 508\n- Straight: about 1 in 255\n- Three of a Kind: about 1 in 47\n- Two Pair: about 1 in 21\n- One Pair: about 1 in 2.4\n- High Card: about 1 in 2\n\nYou'll see one pair and high card more than everything else combined. Most pots are won with a pair or less, which is why hand reading and bluffing skills matter so much. If everyone just waited around for flushes and full houses, nobody would play.`,
    },
  ],
  quiz: [
    {
      id: 'ch2-q1',
      question: 'Which hand beats a flush?',
      options: ['Straight', 'Two Pair', 'Full House', 'Three of a Kind'],
      correctIndex: 2,
      explanation: 'A full house (three of a kind + a pair) beats a flush.',
    },
    {
      id: 'ch2-q2',
      question: 'What is the lowest possible straight?',
      options: ['2-3-4-5-6', 'A-2-3-4-5', '3-4-5-6-7', 'A-K-Q-J-T'],
      correctIndex: 1,
      explanation: 'A-2-3-4-5 (called the "wheel") is the lowest straight. The ace counts as low.',
    },
    {
      id: 'ch2-q3',
      question: 'Player A has K-Q, Player B has K-J. Board: K-8-5-3-2. Who wins?',
      options: ['Player A', 'Player B', 'It\'s a tie', 'Neither'],
      correctIndex: 0,
      explanation: 'Both have a pair of kings, but Player A\'s queen kicker beats Player B\'s jack.',
    },
    {
      id: 'ch2-q4',
      question: 'Does a spade flush beat a heart flush of equal values?',
      options: ['Yes, spades rank highest', 'Yes, black beats red', 'No, suits are never ranked', 'Depends on the cards'],
      correctIndex: 2,
      explanation: 'Suits don\'t have any ranking in Hold\'em. Equal-value flushes tie.',
    },
  ],
  linkedTrainer: {
    href: '/train/hand-rankings',
    label: 'Hand Rankings Drill',
  },
};
