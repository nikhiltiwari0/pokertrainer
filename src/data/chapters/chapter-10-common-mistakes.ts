import { Chapter } from '@/types/course';

export const chapter10: Chapter = {
  slug: 'common-mistakes',
  title: 'Common Mistakes & Tips',
  description: 'Avoid the leaks that cost most players money.',
  order: 10,
  sections: [
    {
      heading: 'Playing too many hands',
      content: `This is the single most expensive mistake new players make, and it's easy to understand why. Folding is boring. You came to play poker, not watch other people play poker. So you talk yourself into calling with K4 offsuit because "it has a king" or playing J7 suited because "suited cards are good, right?"\n\nThe problem is math. Out of 169 unique starting hands, only about 20-25% are worth playing, and that's from late position. From early position, you should be playing closer to 15%. Everything else is a long-term money loser.\n\nHere's a way to think about it: every hand you play costs you something. Either you lose the pot outright, or you put yourself in tough spots on later streets with a weak hand. The money you save by folding trash is just as real as the money you win with strong hands.\n\nIf you catch yourself playing more than 30% of hands from any position, tighten up. The ranges from the Starting Hands chapter aren't suggestions. They're what winning looks like.`,
    },
    {
      heading: 'Ignoring position',
      content: `This usually goes hand-in-hand with playing too many hands. New players see their two cards and decide whether to play without even glancing at their position. That's like deciding whether to cross the street without looking at the traffic light.\n\nQ9 offsuit from the button? Sure, fine. Q9 offsuit from UTG? That's asking for trouble. You have five people behind you who could wake up with a better hand, and if you get called, you'll be out of position for the entire rest of the hand.\n\nThe fix is simple but takes discipline: look at your position before you look at your cards. Seriously. Glance at where the dealer button is, figure out where you are, and then decide your range. After a while this becomes second nature, but at the start you have to force yourself to do it.\n\nIf you want concrete numbers, go back to the chapter on table positions. But the rough version is: early position means tight, late position means looser, and blinds are somewhere in between depending on the action.`,
    },
    {
      heading: 'Chasing draws without the odds',
      content: `You have a gutshot straight draw. Four outs. The pot is 100 and your opponent bets 100. You need to call 100 to win 300, which means you need about 33% equity. With four outs on the turn, you have roughly 8%.\n\nYou should fold. But it feels wrong, because what if the next card is the one you need? What if you hit it and win a huge pot?\n\nThis kind of thinking is how bankrolls evaporate. You will sometimes hit. But over hundreds and thousands of hands, calling without the right price is a steady leak. You lose more on the misses than you win on the hits.\n\nThe Rule of 2 and 4 from the pot odds chapter makes this fast. Count your outs, multiply by 2 (on the turn) or 4 (on the flop), and compare that number to your pot odds. If the equity number is lower, fold. Don't romanticize the draw.\n\nThe one exception is implied odds, which we covered earlier. If you have reason to believe you'll win a lot of extra money when your draw completes, calling can be justified even when the immediate pot odds say no. But be honest with yourself about how often that really happens.`,
    },
    {
      heading: 'Tilt',
      content: `Tilt is when your emotions take over your decision-making. Usually it happens after a bad beat, where you had your opponent crushed and they sucked out on the river. Or after a string of lost pots where nothing seems to go right. You get frustrated, and that frustration starts driving your play.\n\nHere's what tilt looks like in practice: you start playing looser because you want to win a pot, any pot. You call bets you should fold because you're annoyed. You make huge bluffs into players who are never folding because you want to feel like you did something. You stop thinking about ranges and odds and start thinking about revenge.\n\nEvery single poker player in history has experienced tilt. The difference between winning and losing players is how they handle it.\n\nThe most effective thing you can do is recognize when it's happening and stop playing. Just walk away. Close the laptop. Take a break. The games will still be there when you come back with a clear head.\n\nIf you can't bring yourself to quit, at least tighten your ranges way up. Play nothing but premium hands until the frustration passes. It's damage control. Not ideal, but better than hemorrhaging chips while you're seeing red.\n\nSome players set a stop-loss rule for themselves: if they lose three buy-ins in a session, they're done for the day. Whatever works for you, the point is to have a plan before tilt hits, because in the moment you won't be thinking clearly enough to make one.`,
    },
    {
      heading: 'Bankroll management',
      content: `Even very good players lose sessions. Variance in poker is real, and it can be brutal. You can play perfectly and still lose money over a week, sometimes even over a month. That's just how probability works.\n\nBankroll management is how you survive the downswings. The idea is simple: don't play at stakes where a normal losing streak wipes you out.\n\nFor cash games, keep at least 20 buy-ins for the level you play. If you're playing $0.25/$0.50 with $50 buy-ins, you want at least $1,000 set aside for poker. If your bankroll drops below 20 buy-ins, move down a level. If it grows well above 30, you can consider moving up.\n\nFor tournaments, you need more because variance is higher. 50 to 100 buy-ins is the usual recommendation. Tournament players can go on much longer losing streaks than cash players because so much depends on a few deep runs.\n\nThe hardest part of bankroll management is the emotional side. Moving down in stakes feels like going backwards. But playing at a level your bankroll can't support is how people go broke. Moving down temporarily protects your ability to play at all.`,
    },
    {
      heading: 'Studying and improving',
      content: `The players who get better are the ones who put in work away from the table. Playing a lot of hands is necessary, but it's not sufficient. You need to think about what happened and why.\n\nAfter a session, pick two or three hands that were tough decisions. Walk through them. What was the pot size? What were the pot odds? What range did your opponent have? Would you make the same decision again? This kind of review doesn't need to take long, maybe ten or fifteen minutes, but it compounds over time.\n\nThe training modules on this site are designed for exactly this kind of work. Preflop ranges, hand recognition, pot odds calculations, postflop scenarios. Each one isolates a specific skill and lets you drill it in repetition. Ten minutes a day with the preflop trainer, for example, and within a couple weeks you'll know your opening ranges cold.\n\nOne thing to watch out for: trying to fix everything at once. You'll learn faster if you pick one leak and work on it until it's patched, then move to the next one. Start with hand selection and position, since those are the foundation. Then pot odds. Then postflop play. Each one builds on the last.\n\nYou're already doing the right thing by going through this course. That alone puts you ahead of most recreational players who never study at all.`,
    },
  ],
  quiz: [
    {
      id: 'ch10-q1',
      question: 'What is the most common mistake beginners make?',
      options: ['Bluffing too much', 'Playing too many hands', 'Folding too often', 'Betting too small'],
      correctIndex: 1,
      explanation: 'Playing too many hands is the most common and most costly beginner mistake.',
    },
    {
      id: 'ch10-q2',
      question: 'What is tilt?',
      options: [
        'A type of bet',
        'Playing emotionally instead of logically',
        'A strategy for winning big pots',
        'Folding too many hands',
      ],
      correctIndex: 1,
      explanation: 'Tilt is letting emotions drive your poker decisions instead of logic.',
    },
    {
      id: 'ch10-q3',
      question: 'How many buy-ins should you have for cash games?',
      options: ['5-10', '10-15', '20-30', '100+'],
      correctIndex: 2,
      explanation: '20-30 buy-ins is the recommended minimum for cash game bankroll management.',
    },
    {
      id: 'ch10-q4',
      question: 'What should you do when you recognize you are on tilt?',
      options: [
        'Play more aggressively to win it back',
        'Switch to a higher stakes table',
        'Stop playing or tighten up significantly',
        'Start bluffing more to feel in control',
      ],
      correctIndex: 2,
      explanation: 'When on tilt, the best move is to stop playing or at least tighten your ranges until the frustration passes.',
    },
  ],
};
