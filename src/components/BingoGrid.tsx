import type { FC } from 'react';
import styles from './BingoGrid.module.css';
import { BingoCell } from './BingoCell';

interface BingoGridProps {
  grid: number[][];
  markedCells: boolean[][];
  onCellClick: (row: number, col: number) => void;
}

export const BingoGrid: FC<BingoGridProps> = ({ grid, markedCells, onCellClick }) => {
  return (
    <div 
      className={styles.grid} 
      style={{ '--grid-cols': grid[0]?.length || 3 } as React.CSSProperties}
    >
      {grid.map((row, rowIndex) => (
        row.map((number, colIndex) => (
          <BingoCell
            key={`${rowIndex}-${colIndex}`}
            number={number}
            isMarked={markedCells[rowIndex][colIndex]}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      ))}
    </div>
  );
};
