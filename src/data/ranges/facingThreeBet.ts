import { Position } from '@/types';

interface Facing3BetRange {
  call: Set<string>;
  fourBet: Set<string>;
}

// Key: "openerPosition_vs_threeBettorPosition"
// Hero opened, got 3-bet. Hands not in call or fourBet = fold.
const FACING_3BET: Record<string, Facing3BetRange> = {
  UTG_vs_HJ: {
    fourBet: new Set(['AA','KK','QQ','AKs']),
    call: new Set(['JJ','TT','AKo','AQs']),
  },
  UTG_vs_CO: {
    fourBet: new Set(['AA','KK','QQ','AKs']),
    call: new Set(['JJ','TT','AKo','AQs']),
  },
  UTG_vs_BTN: {
    fourBet: new Set(['AA','KK','QQ','AKs','A5s']),
    call: new Set(['JJ','TT','AKo','AQs','AJs']),
  },
  UTG_vs_SB: {
    fourBet: new Set(['AA','KK','QQ','AKs']),
    call: new Set(['JJ','TT','AKo','AQs']),
  },
  UTG_vs_BB: {
    fourBet: new Set(['AA','KK','QQ','AKs']),
    call: new Set(['JJ','TT','AKo','AQs']),
  },
  HJ_vs_CO: {
    fourBet: new Set(['AA','KK','QQ','AKs','A5s']),
    call: new Set(['JJ','TT','AKo','AQs','AJs']),
  },
  HJ_vs_BTN: {
    fourBet: new Set(['AA','KK','QQ','AKs','A5s','A4s']),
    call: new Set(['JJ','TT','99','AKo','AQs','AJs']),
  },
  HJ_vs_SB: {
    fourBet: new Set(['AA','KK','QQ','AKs','A5s']),
    call: new Set(['JJ','TT','AKo','AQs']),
  },
  HJ_vs_BB: {
    fourBet: new Set(['AA','KK','QQ','AKs','A5s']),
    call: new Set(['JJ','TT','AKo','AQs']),
  },
  CO_vs_BTN: {
    fourBet: new Set(['AA','KK','QQ','AKs','AKo','A5s','A4s']),
    call: new Set(['JJ','TT','99','AQs','AJs','KQs']),
  },
  CO_vs_SB: {
    fourBet: new Set(['AA','KK','QQ','AKs','A5s']),
    call: new Set(['JJ','TT','AKo','AQs','AJs']),
  },
  CO_vs_BB: {
    fourBet: new Set(['AA','KK','QQ','AKs','A5s']),
    call: new Set(['JJ','TT','AKo','AQs','AJs']),
  },
  BTN_vs_SB: {
    fourBet: new Set(['AA','KK','QQ','JJ','AKs','AKo','A5s','A4s','A3s']),
    call: new Set(['TT','99','88','AQs','AQo','AJs','ATs','KQs','KJs']),
  },
  BTN_vs_BB: {
    fourBet: new Set(['AA','KK','QQ','JJ','AKs','AKo','A5s','A4s']),
    call: new Set(['TT','99','AQs','AQo','AJs','ATs','KQs']),
  },
  SB_vs_BB: {
    fourBet: new Set(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','A5s','A4s']),
    call: new Set(['99','88','AQo','AJs','ATs','KQs','KJs']),
  },
};

export function getActionFacingThreeBet(
  hand: string,
  openerPosition: Position,
  threeBettorPosition: Position
): 'call' | 'raise' | 'fold' {
  const key = `${openerPosition}_vs_${threeBettorPosition}`;
  const range = FACING_3BET[key];
  if (!range) return 'fold';
  if (range.fourBet.has(hand)) return 'raise';
  if (range.call.has(hand)) return 'call';
  return 'fold';
}
