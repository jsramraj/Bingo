import type { FC } from 'react';
import styles from './BingoGrid.module.css';
import { BingoCell } from './BingoCell';

interface BingoGridProps {
  grid: number[][];
  markedCells: boolean[][];
  bingoLines: [number, number, number, 'row' | 'col' | 'diag' | 'antidiag'][];
  score: number;
  onCellClick: (row: number, col: number) => void;
}

export const BingoGrid: FC<BingoGridProps> = ({ 
  grid, 
  markedCells, 
  bingoLines = [], // Add default empty array
  score = 0, // Add default score
  onCellClick 
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.scoreContainer}>
        <span className={styles.scoreLabel}>Score:</span>
        <span className={styles.scoreValue}>{score}</span>
      </div>
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
              isBingo={bingoLines.some(([start, end, _, type]) => {
                if (type === 'row' && start === rowIndex) return true;
                if (type === 'col' && end === colIndex) return true;
                if (type === 'diag' && rowIndex === colIndex) return true;
                if (type === 'antidiag' && rowIndex + colIndex === grid.length - 1) return true;
                return false;
              })}
            />
          ))
        ))}
      </div>
    </div>
  );
};
