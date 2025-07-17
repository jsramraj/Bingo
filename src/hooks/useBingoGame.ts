import { useState, useEffect } from 'react';

interface GameState {
  grid: number[][];
  markedCells: boolean[][];
}

interface UseBingoGameResult {
  grid: number[][];
  markedCells: boolean[][];
  markCell: (row: number, col: number) => void;
  resetGame: (rows: number, cols: number) => void;
}

const STORAGE_KEY = 'bingo-game-state';

const loadGameState = (): GameState | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

const saveGameState = (state: GameState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const useBingoGame = (initialRows: number, initialCols: number): UseBingoGameResult => {
  const [grid, setGrid] = useState<number[][]>(() => {
    const saved = loadGameState();
    return saved ? saved.grid : [];
  });
  const [markedCells, setMarkedCells] = useState<boolean[][]>(() => {
    const saved = loadGameState();
    return saved ? saved.markedCells : [];
  });

  const generateGrid = (rows: number, cols: number) => {
    const totalCells = rows * cols;
    const numbers = Array.from({ length: totalCells }, (_, i) => i + 1);
    // Shuffle array using Fisher-Yates algorithm
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
    saveGameState({ grid, markedCells: newMarkedCells });
  };

  const resetGame = (rows: number, cols: number) => {
    localStorage.removeItem(STORAGE_KEY);
    generateGrid(rows, cols);
  };

  useEffect(() => {
    if (grid.length === 0) {
      generateGrid(initialRows, initialCols);
    }
  }, []);

  useEffect(() => {
    if (grid.length > 0) {
      saveGameState({ grid, markedCells });
    }
  }, [grid]);

  return { grid, markedCells, markCell, resetGame };
};
