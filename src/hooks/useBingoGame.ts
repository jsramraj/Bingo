import { useState } from 'react';

interface UseBingoGameResult {
  grid: number[][];
  markedCells: boolean[][];
  markCell: (row: number, col: number) => void;
  resetGame: (rows: number, cols: number) => void;
}

export const useBingoGame = (initialRows: number, initialCols: number): UseBingoGameResult => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [markedCells, setMarkedCells] = useState<boolean[][]>([]);

  const generateGrid = (rows: number, cols: number) => {
    const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    const newGrid: number[][] = [];
    const newMarkedCells: boolean[][] = [];
    
    for (let i = 0; i < rows; i++) {
      newGrid[i] = numbers.slice(i * cols, (i + 1) * cols);
      newMarkedCells[i] = new Array(cols).fill(false);
    }

    setGrid(newGrid);
    setMarkedCells(newMarkedCells);
  };

  const markCell = (row: number, col: number) => {
    const newMarkedCells = markedCells.map((r, i) =>
      i === row ? r.map((cell, j) => (j === col ? !cell : cell)) : r
    );
    setMarkedCells(newMarkedCells);
  };

  const resetGame = (rows: number, cols: number) => {
    generateGrid(rows, cols);
  };

  // Initialize the game
  if (grid.length === 0) {
    generateGrid(initialRows, initialCols);
  }

  return { grid, markedCells, markCell, resetGame };
};
