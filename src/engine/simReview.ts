import { DecisionPoint, HandReview, ShowdownResult, SimGameState } from '@/types/simulation';
import { toHandNotation } from './handEvaluator';
import { isRFI } from '@/data/ranges/rfi';
import { getActionFacingRaise } from '@/data/ranges/facingRaise';
import { getActionFacingThreeBet } from '@/data/ranges/facingThreeBet';
import { categorizePostflopHand, HandStrengthCategory } from './simHandStrength';

const BB = 2;

export function analyzeHeroDecision(dp: DecisionPoint): DecisionPoint {
  if (dp.street === 'preflop') {
    return analyzePreflopDecision(dp);
  }
  return analyzePostflopDecision(dp);
}

function analyzePreflopDecision(dp: DecisionPoint): DecisionPoint {
  const hand = toHandNotation(dp.holeCards[0], dp.holeCards[1]);
  const actionsBefore = dp.actionsBefore.filter(a => a.street === 'preflop');
  const raises = actionsBefore.filter(a => a.action === 'raise' || a.action === 'bet');
  const hasRaise = raises.length > 0;
  const has3Bet = raises.length >= 2;

  let recommended: 'fold' | 'call' | 'raise' | 'check' = 'fold';
  let explanation = '';

  if (!hasRaise) {
    // RFI spot
    if (isRFI(hand, dp.position)) {
      recommended = 'raise';
      explanation = `${hand} is in your opening range from ${dp.position}. You should raise.`;
    } else if (dp.amountToCall === 0) {
      recommended = 'check';
      explanation = `${hand} is not strong enough to open from ${dp.position}. Checking from the BB is fine.`;
    } else {
      recommended = 'fold';
      explanation = `${hand} is outside the opening range from ${dp.position}. Fold and wait for a better spot.`;
    }
  } else if (hasRaise && !has3Bet) {
    const raiserPos = raises[0].position;
    const result = getActionFacingRaise(hand, dp.position, raiserPos);
    recommended = result;
    if (result === 'raise') {
      explanation = `${hand} is strong enough to 3-bet against a ${raiserPos} open from ${dp.position}.`;
    } else if (result === 'call') {
      explanation = `${hand} is worth calling a ${raiserPos} open from ${dp.position}. It plays well postflop.`;
    } else {
      explanation = `${hand} isn't strong enough to continue against a ${raiserPos} open from ${dp.position}. Fold.`;
    }
  } else if (has3Bet) {
    const originalRaiser = raises[0];
    const threeBettor = raises[1];

    // Check if hero was original raiser
    const heroWasRaiser = dp.actionsBefore.some(a => a.isHero && (a.action === 'raise' || a.action === 'bet'));

    if (heroWasRaiser) {
      const result = getActionFacingThreeBet(hand, dp.position, threeBettor.position);
      recommended = result;
      if (result === 'raise') {
        explanation = `${hand} is strong enough to 4-bet against a ${threeBettor.position} 3-bet.`;
      } else if (result === 'call') {
        explanation = `${hand} can call the 3-bet from ${threeBettor.position}. You have position or a strong hand.`;
      } else {
        explanation = `${hand} should fold to the 3-bet. It's not strong enough to continue.`;
      }
    } else {
      const premiums = new Set(['AA', 'KK', 'QQ', 'AKs']);
      if (premiums.has(hand)) {
        recommended = 'call';
        explanation = `${hand} is premium. You can continue even facing a 3-bet.`;
      } else {
        recommended = 'fold';
        explanation = `${hand} should fold in a 3-bet pot when you aren't the original raiser.`;
      }
    }
  }

  const heroAction = dp.heroAction === 'bet' ? 'raise' : dp.heroAction; // normalize
  const isCorrect = heroAction === recommended || (heroAction === 'check' && recommended === 'check');

  return {
    ...dp,
    recommendedAction: recommended,
    recommendedAmount: 0,
    isCorrect,
    explanation,
  };
}

function analyzePostflopDecision(dp: DecisionPoint): DecisionPoint {
  const category = categorizePostflopHand(dp.holeCards, dp.communityCards);
  const facingBet = dp.amountToCall > 0;

  let recommended = dp.heroAction;
  let explanation = '';
  const categoryLabel = getCategoryLabel(category);

  if (facingBet) {
    const potOdds = dp.amountToCall / (dp.pot + dp.amountToCall);

    switch (category) {
      case 'monster':
        recommended = 'raise';
        explanation = `You have ${categoryLabel}. With a strong hand facing a bet, raising for value is the best play.`;
        break;
      case 'strong':
        recommended = 'call';
        explanation = `You have ${categoryLabel}. Calling keeps the pot growing without bloating it. A raise is also reasonable.`;
        break;
      case 'medium':
        recommended = potOdds < 0.3 ? 'call' : 'fold';
        explanation = potOdds < 0.3
          ? `You have ${categoryLabel} and the bet is small relative to the pot. Calling is fine.`
          : `You have ${categoryLabel} but the bet is too large. Folding saves chips for better spots.`;
        break;
      case 'draw':
        recommended = potOdds < 0.35 ? 'call' : 'fold';
        explanation = potOdds < 0.35
          ? `You have a draw. The pot is offering a decent price, so calling is profitable.`
          : `You have a draw but the price is too high. You need better odds to call profitably.`;
        break;
      case 'air':
        recommended = 'fold';
        explanation = `You have nothing. Fold rather than putting more chips in with no equity.`;
        break;
    }
  } else {
    // Checked to hero
    switch (category) {
      case 'monster':
        recommended = 'bet';
        explanation = `You have ${categoryLabel}. Bet for value to build the pot.`;
        break;
      case 'strong':
        recommended = 'bet';
        explanation = `You have ${categoryLabel}. Betting for value is correct — worse hands will call.`;
        break;
      case 'medium':
        recommended = 'check';
        explanation = `You have ${categoryLabel}. Checking to control the pot size is the safe play.`;
        break;
      case 'draw':
        recommended = 'bet';
        explanation = `You have a draw. Semi-bluffing by betting gives you two ways to win: they fold now, or you hit your draw.`;
        break;
      case 'air':
        recommended = 'check';
        explanation = `You have nothing. Check and give up unless you have a specific reason to bluff.`;
        break;
    }
  }

  // Determine correctness — allow some flexibility
  const isCorrect = isActionCorrect(dp.heroAction, recommended, category, facingBet);

  return {
    ...dp,
    recommendedAction: recommended,
    recommendedAmount: 0,
    isCorrect,
    explanation,
  };
}

function isActionCorrect(
  heroAction: string,
  recommended: string,
  category: HandStrengthCategory,
  facingBet: boolean,
): boolean {
  // Exact match
  if (heroAction === recommended) return true;

  // Accept call OR raise with monster
  if (category === 'monster' && (heroAction === 'call' || heroAction === 'raise' || heroAction === 'bet')) return true;

  // Accept call OR raise with strong
  if (category === 'strong' && (heroAction === 'call' || heroAction === 'raise' || heroAction === 'bet')) return true;

  // Accept check or call with medium when not facing large bets
  if (category === 'medium' && !facingBet && (heroAction === 'check' || heroAction === 'bet')) return true;

  // Accept bet or check with draw
  if (category === 'draw' && !facingBet && (heroAction === 'bet' || heroAction === 'check')) return true;

  return false;
}

function getCategoryLabel(cat: HandStrengthCategory): string {
  switch (cat) {
    case 'monster': return 'a very strong hand';
    case 'strong': return 'a strong hand';
    case 'medium': return 'a medium-strength hand';
    case 'draw': return 'a draw';
    case 'air': return 'nothing';
  }
}

export function generateHandReview(
  decisionPoints: DecisionPoint[],
  showdownResult: ShowdownResult | null,
  handNumber: number,
): HandReview {
  const analyzed = decisionPoints.map(dp => analyzeHeroDecision(dp));
  const correctCount = analyzed.filter(dp => dp.isCorrect).length;
  const total = analyzed.length;

  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  if (total === 0) {
    grade = 'A';
  } else {
    const pct = correctCount / total;
    if (pct >= 1) grade = 'A';
    else if (pct >= 0.75) grade = 'B';
    else if (pct >= 0.5) grade = 'C';
    else if (pct >= 0.25) grade = 'D';
    else grade = 'F';
  }

  const summary = total === 0
    ? 'No decisions to review (you folded preflop).'
    : `${correctCount} of ${total} decision${total === 1 ? '' : 's'} correct.`;

  return {
    decisionPoints: analyzed,
    showdownResult,
    overallGrade: grade,
    correctCount,
    totalDecisions: total,
    summary,
    handNumber,
  };
}
