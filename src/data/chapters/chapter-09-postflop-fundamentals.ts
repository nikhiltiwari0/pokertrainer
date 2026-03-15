import { Chapter } from '@/types/course';

export const chapter09: Chapter = {
  slug: 'postflop-fundamentals',
  title: 'Postflop Fundamentals',
  description: 'Continuation bets, hand reading basics, value bets and bluffs.',
  order: 9,
  sections: [
    {
      heading: 'Continuation betting (c-bet)',
      content: `The flop comes down, you were the preflop raiser, and now everyone's looking at you. Most of the time, you should bet. That's a continuation bet, or c-bet. You raised before the flop, and you're continuing your story on the flop.\n\nWhy does it work? Because most flops miss most hands. Your opponent will whiff the flop roughly two-thirds of the time. If you bet, they usually have to fold. It doesn't even matter much what you have. You're exploiting the fact that the flop is more likely to miss them than hit them.\n\nThat said, you shouldn't c-bet every single flop. Some boards really favor the caller's range. If you opened from early position and the flop comes 8-7-6 with two hearts, that board smacks the hands that would call you preflop (suited connectors, medium pairs) and mostly misses the premium hands you'd be raising with. On those boards, checking is fine.\n\nGood spots to c-bet: you flopped top pair or better, the board is dry and disconnected (like K-7-2 rainbow), or you have a strong draw and want to put pressure on. Bad spots: the board is coordinated, you're against multiple opponents, or you have absolutely nothing and the board hits their range hard.\n\nA reasonable c-bet frequency is somewhere around 50-65% on the flop. If you're betting 100% of the time, you're betting too much air and observant opponents will start check-raising you. If you're betting only when you hit, you're way too predictable.`,
    },
    {
      heading: 'Value betting',
      content: `A value bet is straightforward: you think you have the best hand, and you want your opponent to pay you for it. You're betting because you want to get called.\n\nThe question you should ask before every value bet is "what worse hands will call me?" If you can name specific hands that are worse than yours and would realistically call, go ahead and bet. If you can't, you're probably just turning your hand into a bluff.\n\nHere's where it gets interesting. There's a spectrum of value bets. On one end, you have the obvious ones. You flopped a set, the board is safe, and you bet. Nobody argues with that. On the other end, you have thin value bets. You have second pair on the river, and you think your opponent might call with ace-high or a weaker pair. Those thin value bets are where good players separate themselves from average ones.\n\nSizing matters too. Against someone who calls too much (a "calling station"), bet bigger. They're going to call anyway, so make them pay. Against a tighter player, you might size down a bit so they don't just fold everything you beat. On the river especially, think about what your opponent can realistically call with, and pick a size that gets the most out of those hands.`,
    },
    {
      heading: 'Bluffing',
      content: `Bluffing is betting when you think you have the worst hand, hoping your opponent folds something better. It's the part of poker everyone thinks about, but it's also the part that gets people in trouble when they do it wrong.\n\nGood bluffs aren't random. You need a reason to think your opponent will fold. That reason might be the board texture: a third heart just hit and you're representing a flush. It might be their behavior: they checked twice, which usually means they're not thrilled with their hand. Or it might be your cards: you hold the ace of hearts, which means they're less likely to have a flush (that's called a "blocker").\n\nThe best bluffs are semi-bluffs. You bet with a flush draw or a straight draw, and two things can happen. They fold and you win immediately. Or they call and you still have a chance to make the best hand. Compare that to a pure bluff with nothing, where if they call, you're drawing dead.\n\nBluffs fail when you try them against opponents who don't fold. Some players will call you down with third pair. Against those players, just stop bluffing and value bet thinner. Also, bluffs work worse in multiway pots. Getting one person to fold is hard enough. Getting three people to all fold is a lot harder.\n\nOne thing that helps: think about what your bet looks like from their perspective. If you've been playing the hand like you have a big pair and a scary card hits, a big bet tells a believable story. If you've been checking and calling and suddenly shove the river, the story doesn't add up.`,
    },
    {
      heading: 'Pot control',
      content: `Not every hand is worth building a big pot. When you have a medium-strength hand that's probably ahead but could easily be beaten, your goal is to get to showdown without the pot getting out of control. That's pot control.\n\nSay you have AJ on a J-8-3 board. You have top pair with a decent kicker. That's a fine hand. But if you bet the flop, get called, bet the turn, get called, and then fire a big river bet, you've built a massive pot. And the hands that stuck around through all that action are usually ones that beat you: a better jack, two pair, or a set.\n\nInstead, try checking one street. Bet the flop, check back the turn in position, and then decide on the river. Or check the flop and bet the turn. Either way, you keep the pot manageable and give yourself a chance to reach showdown without going broke.\n\nPot control is about recognizing that your hand is good but not great. With strong hands (sets, flushes, straights), you want the pot to grow. With air, you're either bluffing or giving up. It's those middle-strength hands where pot control shines. Top pair with a mediocre kicker, second pair, that sort of thing.`,
    },
    {
      heading: 'Hand reading basics',
      content: `Hand reading isn't about putting your opponent on exactly two cards. It's about narrowing down their range of possible hands as the hand plays out.\n\nStart with their preflop action. If they opened from UTG, they have a tight range: big pairs, big broadways, some suited aces. If they called from the button, their range is wider: suited connectors, small pairs, a lot of broadway hands, random suited stuff.\n\nThen layer on what the board looks like. On a K-7-2 rainbow board, the UTG raiser could easily have KK, AK, KQ. The button caller might have a small pair that missed, a suited connector that missed, or maybe K9 or KT.\n\nNow factor in their action on each street. They bet the flop. Okay, that's consistent with having a king or possibly a c-bet bluff. They bet the turn too, which was a 5. That's consistent with a real hand. A lot of bluffs would give up here. They bet the river, which was a 3. Three streets of betting on a dry board usually means they have something.\n\nYou don't need to be exact. Just practice eliminating hands. Would they really play 72 this way? Probably not. Would they play AA this way? Probably yes. Over time, you get a feel for what ranges look like on different board textures, and your decisions get sharper.\n\nThe Postflop Trainer has scenarios designed around these exact situations. Working through them builds the pattern recognition that makes hand reading feel more natural.`,
    },
  ],
  quiz: [
    {
      id: 'ch9-q1',
      question: 'What is a continuation bet?',
      options: [
        'Betting the river after checking the turn',
        'The preflop raiser betting again on the flop',
        'Calling a bet to continue in the hand',
        'Betting after someone checks to you',
      ],
      correctIndex: 1,
      explanation: 'A c-bet is when the preflop aggressor continues their aggression by betting on the flop.',
    },
    {
      id: 'ch9-q2',
      question: 'When should you NOT bluff?',
      options: [
        'When you have blockers',
        'When the board is scary for your opponent',
        'Against a player who never folds',
        'When your opponent checked',
      ],
      correctIndex: 2,
      explanation: 'Bluffing against calling stations who never fold is a waste of chips.',
    },
    {
      id: 'ch9-q3',
      question: 'What is pot control?',
      options: [
        'Betting the maximum every hand',
        'Keeping the pot small with medium-strength hands',
        'Folding weak hands',
        'Raising every bet',
      ],
      correctIndex: 1,
      explanation: 'Pot control means keeping the pot small when you have a decent but vulnerable hand.',
    },
    {
      id: 'ch9-q4',
      question: 'What should you ask yourself before making a value bet?',
      options: [
        'How much money is in my stack?',
        'What worse hands will call me?',
        'How many players are at the table?',
        'What time is it?',
      ],
      correctIndex: 1,
      explanation: 'If you can identify worse hands that will call, you have a value bet. If nothing worse is calling, you\'re just turning your hand into a bluff.',
    },
  ],
  linkedTrainer: {
    href: '/train/postflop',
    label: 'Postflop Trainer',
  },
};
