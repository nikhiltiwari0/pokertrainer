import { Position } from '@/types';

// Raise First In ranges for 6-max. Simplified GTO.
// Each position maps to the set of hands that should be open-raised when folded to.
const RFI_RANGES: Record<Position, Set<string>> = {
  UTG: new Set([
    'AA','KK','QQ','JJ','TT','99','88','77','66',
    'AKs','AQs','AJs','ATs','A5s','A4s',
    'KQs','KJs','KTs',
    'QJs','QTs',
    'JTs',
    'T9s',
    '98s',
    'AKo','AQo','AJo',
  ]),

  HJ: new Set([
    'AA','KK','QQ','JJ','TT','99','88','77','66','55',
    'AKs','AQs','AJs','ATs','A9s','A8s','A5s','A4s','A3s',
    'KQs','KJs','KTs','K9s',
    'QJs','QTs','Q9s',
    'JTs','J9s',
    'T9s',
    '98s','87s','76s','65s','54s',
    'AKo','AQo','AJo','ATo',
    'KQo','KJo',
  ]),

  CO: new Set([
    'AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22',
    'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
    'KQs','KJs','KTs','K9s','K8s','K7s',
    'QJs','QTs','Q9s','Q8s',
    'JTs','J9s','J8s',
    'T9s','T8s',
    '98s','97s',
    '87s','86s',
    '76s','75s',
    '65s','64s',
    '54s',
    'AKo','AQo','AJo','ATo','A9o',
    'KQo','KJo','KTo',
    'QJo',
  ]),

  BTN: new Set([
    'AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22',
    'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
    'KQs','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s','K3s','K2s',
    'QJs','QTs','Q9s','Q8s','Q7s','Q6s','Q5s','Q4s',
    'JTs','J9s','J8s','J7s','J6s',
    'T9s','T8s','T7s',
    '97s','96s',
    '87s','86s','85s',
    '76s','75s',
    '65s','64s',
    '54s','53s',
    '43s',
    'AKo','AQo','AJo','ATo','A9o','A8o','A7o','A6o','A5o','A4o','A3o','A2o',
    'KQo','KJo','KTo','K9o','K8o',
    'QJo','QTo','Q9o',
    'JTo','J9o',
    'T9o','T8o',
    '98o','97o',
    '87o',
    '76o',
  ]),

  SB: new Set([
    'AA','KK','QQ','JJ','TT','99','88','77','66','55','44','33','22',
    'AKs','AQs','AJs','ATs','A9s','A8s','A7s','A6s','A5s','A4s','A3s','A2s',
    'KQs','KJs','KTs','K9s','K8s','K7s','K6s','K5s','K4s',
    'QJs','QTs','Q9s','Q8s','Q7s','Q6s','Q5s',
    'JTs','J9s','J8s','J7s',
    'T9s','T8s','T7s',
    '97s','96s',
    '87s','86s','85s',
    '76s','75s',
    '65s','64s',
    '54s','53s',
    '43s',
    'AKo','AQo','AJo','ATo','A9o','A8o','A7o','A6o','A5o','A4o',
    'KQo','KJo','KTo','K9o',
    'QJo','QTo','Q9o',
    'JTo','J9o',
    'T9o',
    '98o',
  ]),

  BB: new Set([]), // BB does not RFI
};

export function getRFIRange(position: Position): Set<string> {
  return RFI_RANGES[position];
}

export function isRFI(hand: string, position: Position): boolean {
  return RFI_RANGES[position].has(hand);
}
