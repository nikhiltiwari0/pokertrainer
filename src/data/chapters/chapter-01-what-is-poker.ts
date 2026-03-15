import { Chapter } from '@/types/course';

export const chapter01: Chapter = {
  slug: 'what-is-poker',
  title: 'What is Poker?',
  description: 'How Texas Hold\'em works, from deal to showdown, in plain language.',
  order: 1,
  sections: [
    {
      heading: 'The short version',
      content: `Texas Hold'em is a card game where you try to make the best five-card hand from seven cards. You get two private cards (called "hole cards"), and five shared cards go face-up on the table over the course of the hand. Everyone uses the same five shared cards, combined with their own two, to build their best hand.\n\nOr you can skip all that and just get everyone to fold. That works too. You don't have to show your cards if nobody calls you. This is the part of poker that makes it interesting: the best hand doesn't always win. The best player does.`,
    },
    {
      heading: 'How a hand plays out',
      content: `There are four rounds of betting in every hand, and new cards come out between each one:\n\n1. Preflop: everyone gets their two hole cards. Betting starts.\n2. Flop: three shared cards hit the table at once. More betting.\n3. Turn: a fourth shared card. More betting.\n4. River: the fifth and last shared card. Final round of betting.\n\nIf two or more players are still in after the river, they flip their cards over (the "showdown") and the best five-card hand takes the pot. But most hands never make it to showdown. Somebody bets, everybody else folds, hand over.`,
    },
    {
      heading: 'Forced bets (the blinds)',
      content: `Before any cards are dealt, two players have to put money in the pot. The player directly left of the dealer puts in a small bet (the "small blind"), and the next player puts in a bigger one (the "big blind," usually double the small blind).\n\nThese rotate every hand, so everyone takes turns paying them. The blinds exist for one reason: to give people something to fight over. Without them, you could just sit there folding every hand and never lose a cent, which would make for a really boring game.`,
    },
    {
      heading: 'Two ways to win',
      content: `You take the pot in one of two ways. Either you have the best hand at showdown, or everyone else gives up before you get there.\n\nThat second way is why poker isn't just a card game. If it were only about who got the best cards, it'd be a coin flip with extra steps. Bluffing, reading opponents, choosing when to be aggressive and when to back off: that's where the skill lives. A player holding garbage cards can still win if they play the situation right.`,
    },
    {
      heading: 'Cash games vs. tournaments',
      content: `You'll run into two main formats:\n\nIn cash games, the chips represent real money. You sit down, buy chips, and leave whenever you want. The blinds stay the same the whole time. If you lose your chips, you can buy more.\n\nIn tournaments, everyone starts with the same amount of chips. The blinds go up on a timer, putting more and more pressure on short stacks. You play until you run out of chips or you're the last one standing.\n\nMost of what you'll learn in this course applies to both, but we lean toward cash game strategy since the fundamentals are cleaner and the concepts translate well.`,
    },
  ],
  quiz: [
    {
      id: 'ch1-q1',
      question: 'How many hole cards does each player get?',
      options: ['1', '2', '3', '5'],
      correctIndex: 1,
      explanation: 'Every player gets exactly 2 private hole cards.',
    },
    {
      id: 'ch1-q2',
      question: 'How many community cards are dealt in total across all streets?',
      options: ['3', '4', '5', '7'],
      correctIndex: 2,
      explanation: '5 community cards total: 3 on the flop, 1 on the turn, 1 on the river.',
    },
    {
      id: 'ch1-q3',
      question: 'What are the two ways to win a hand?',
      options: [
        'Have the most chips or bluff',
        'Have the best hand at showdown or make everyone else fold',
        'Bet the most or call the most',
        'Win the flop or win the river',
      ],
      correctIndex: 1,
      explanation: 'You win by showing down the best hand, or by getting all opponents to fold.',
    },
    {
      id: 'ch1-q4',
      question: 'Why do the blinds exist?',
      options: [
        'To punish bad players',
        'To create a pot worth fighting over',
        'To determine who deals',
        'To set the maximum bet',
      ],
      correctIndex: 1,
      explanation: 'Blinds force money into the pot so there\'s something to play for each hand.',
    },
  ],
};
