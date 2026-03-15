export type RangeAction = 'raise' | 'call' | 'fold';

export interface MatrixCell {
  notation: string;
  row: number;
  col: number;
  category: 'pair' | 'suited' | 'offsuit';
  action: RangeAction;
  isHighlighted: boolean;
}

export type HandMatrixData = MatrixCell[][];
