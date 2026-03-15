import { Position } from '@/types';

interface FacingRaiseRange {
  call: Set<string>;
  threeBet: Set<string>;
}

// Key: "heroPosition_vs_raiserPosition"
// Hands not in either set = fold
const FACING_RAISE: Record<string, FacingRaiseRange> = {
  HJ_vs_UTG: {
    threeBet: new Set(['AA','KK','QQ','AKs','AKo']),
    call: new Set(['JJ','TT','AQs','AJs','KQs']),
  },
  CO_vs_UTG: {
    threeBet: new Set(['AA','KK','QQ','AKs','AKo','AQs']),
    call: new Set(['JJ','TT','99','AJs','ATs','KQs','QJs','JTs']),
  },
  CO_vs_HJ: {
    threeBet: new Set(['AA','KK','QQ','JJ','AKs','AKo','AQs','A5s']),
    call: new Set(['TT','99','88','AJs','ATs','KQs','KJs','QJs','JTs','T9s']),
  },
  BTN_vs_UTG: {
    threeBet: new Set(['AA','KK','QQ','AKs','AKo']),
    call: new Set(['JJ','TT','99','AQs','AJs','ATs','KQs','QJs','JTs','T9s','98s']),
  },
  BTN_vs_HJ: {
    threeBet: new Set(['AA','KK','QQ','JJ','AKs','AKo','AQs','A5s','A4s']),
    call: new Set(['TT','99','88','77','AJs','ATs','A9s','KQs','KJs','QJs','QTs','JTs','J9s','T9s','98s','87s','76s','65s']),
  },
  BTN_vs_CO: {
    threeBet: new Set(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','AQo','AJs','A5s','A4s','KQs']),
    call: new Set(['99','88','77','66','ATs','A9s','A8s','KJs','KTs','QJs','QTs','JTs','J9s','T9s','T8s','98s','97s','87s','76s','65s','54s']),
  },
  SB_vs_UTG: {
    threeBet: new Set(['AA','KK','QQ','AKs','AKo']),
    call: new Set([]),
  },
  SB_vs_HJ: {
    threeBet: new Set(['AA','KK','QQ','JJ','AKs','AKo','AQs']),
    call: new Set([]),
  },
  SB_vs_CO: {
    threeBet: new Set(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','AJs','A5s','KQs']),
    call: new Set([]),
  },
  SB_vs_BTN: {
    threeBet: new Set(['AA','KK','QQ','JJ','TT','99','AKs','AKo','AQs','AQo','AJs','ATs','A5s','A4s','KQs','KJs','KTs']),
    call: new Set([]),
  },
  BB_vs_UTG: {
    threeBet: new Set(['AA','KK','QQ','AKs','AKo']),
    call: new Set(['JJ','TT','99','88','77','66','AQs','AJs','ATs','A9s','A5s','A4s','KQs','KJs','KTs','QJs','QTs','JTs','T9s','98s','87s','76s','65s','54s']),
  },
  BB_vs_HJ: {
    threeBet: new Set(['AA','KK','QQ','JJ','AKs','AKo','AQs','A5s']),
    call: new Set(['TT','99','88','77','66','55','44','AJs','ATs','A9s','A8s','A4s','A3s','A2s','KQs','KJs','KTs','K9s','QJs','QTs','Q9s','JTs','J9s','T9s','T8s','98s','97s','87s','86s','76s','75s','65s','64s','54s','53s','43s']),
  },
  BB_vs_CO: {
    threeBet: new Set(['AA','KK','QQ','JJ','TT','AKs','AKo','AQs','AQo','A5s','A4s']),
    call: new Set(['99','88','77','66','55','44','33','22','AJs','ATs','A9s','A8s','A7s','A6s','A3s','A2s','KQs','KJs','KTs','K9s','K8s','K7s','QJs','QTs','Q9s','Q8s','JTs','J9s','J8s','T9s','T8s','98s','97s','87s','86s','76s','75s','65s','64s','54s','53s','43s','AJo','ATo','KQo','KJo','QJo','JTo']),
  },
  BB_vs_BTN: {
    threeBet: new Set(['AA','KK','QQ','JJ','TT','99','AKs','AKo','AQs','AQo','AJs','A5s','A4s','A3s','KQs']),
    call: new Set(['88','77','66','55','44','33','22','ATs','A9s','A8s','A7s','A6s','A2s','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s','K3s','K2s','QJs','QTs','Q9s','Q8s','Q7s','Q6s','Q5s','JTs','J9s','J8s','J7s','T9s','T8s','T7s','98s','97s','96s','87s','86s','85s','76s','75s','65s','64s','54s','53s','43s','AJo','ATo','A9o','A8o','A7o','KQo','KJo','KTo','K9o','QJo','QTo','Q9o','JTo','J9o','T9o','T8o','98o','97o','87o']),
  },
  BB_vs_SB: {
    threeBet: new Set(['AA','KK','QQ','JJ','TT','99','88','AKs','AKo','AQs','AQo','AJs','AJo','ATs','A9s','A5s','A4s','A3s','A2s','KQs','KJs','KTs','K9s']),
    call: new Set(['77','66','55','44','33','22','A8s','A7s','A6s','ATo','A9o','A8o','A7o','A6o','A5o','A4o','A3o','A2o','KQo','KJo','KTo','K9o','K8o','K7o','K8s','K7s','K6s','K5s','K4s','K3s','K2s','QJs','QTs','Q9s','Q8s','Q7s','Q6s','Q5s','Q4s','Q3s','Q2s','QJo','QTo','Q9o','Q8o','JTs','J9s','J8s','J7s','J6s','JTo','J9o','J8o','T9s','T8s','T7s','T6s','T9o','T8o','98s','97s','96s','98o','97o','87s','86s','85s','87o','76s','75s','76o','65s','64s','54s','53s','43s']),
  },
};

export function getActionFacingRaise(
  hand: string,
  heroPosition: Position,
  raiserPosition: Position
): 'call' | 'raise' | 'fold' {
  const key = `${heroPosition}_vs_${raiserPosition}`;
  const range = FACING_RAISE[key];
  if (!range) return 'fold';
  if (range.threeBet.has(hand)) return 'raise';
  if (range.call.has(hand)) return 'call';
  return 'fold';
}
