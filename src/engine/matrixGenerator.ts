import { RANKS, Position, ScenarioType } from '@/types';
import { HandMatrixData, MatrixCell } from '@/types/matrix';
import { getRangeForScenario } from '@/data/ranges/rangeUtils';

export function generateMatrix(
  scenarioType: ScenarioType,
  heroPosition: Position,
  raiserPosition?: Position,
  highlightHand?: string
): HandMatrixData {
  const rangeMap = getRangeForScenario(scenarioType, heroPosition, raiserPosition);
  const matrix: HandMatrixData = [];

  for (let row = 0; row < 13; row++) {
    const rowCells: MatrixCell[] = [];
    for (let col = 0; col < 13; col++) {
      let notation: string;
      let category: 'pair' | 'suited' | 'offsuit';

      if (row === col) {
        notation = `${RANKS[row]}${RANKS[col]}`;
        category = 'pair';
      } else if (row < col) {
        // Above diagonal = suited
        notation = `${RANKS[row]}${RANKS[col]}s`;
        category = 'suited';
      } else {
        // Below diagonal = offsuit
        notation = `${RANKS[col]}${RANKS[row]}o`;
        category = 'offsuit';
      }

      const action = rangeMap.get(notation) ?? 'fold';

      rowCells.push({
        notation,
        row,
        col,
        category,
        action,
        isHighlighted: notation === highlightHand,
      });
    }
    matrix.push(rowCells);
  }

  return matrix;
}
