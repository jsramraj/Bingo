import { useState, useEffect } from 'react';

interface GameState {
  grid: number[][];
  markedCells: boolean[][];
  bingoLines: [number, number, number, 'row' | 'col' | 'diag' | 'antidiag'][];
  score: number;
}

interface UseBingoGameResult {
  grid: number[][];
  markedCells: boolean[][];
  bingoLines: [number, number, number, 'row' | 'col' | 'diag' | 'antidiag'][];
  score: number;
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
  const [bingoLines, setBingoLines] = useState<[number, number, number, 'row' | 'col' | 'diag' | 'antidiag'][]>(() => {
    const saved = loadGameState();
    return saved ? saved.bingoLines : [];
  });
  const [score, setScore] = useState<number>(() => {
    const saved = loadGameState();
    return saved ? saved.score : 0;
  });

  const checkBingo = (newMarkedCells: boolean[][]) => {
    const rows = newMarkedCells.length;
    const cols = newMarkedCells[0].length;
    const newBingoLines: [number, number, number, 'row' | 'col' | 'diag' | 'antidiag'][] = [];

    // Check rows
    for (let i = 0; i < rows; i++) {
      if (newMarkedCells[i].every(cell => cell)) {
        newBingoLines.push([i, 0, cols - 1, 'row']);
      }
    }

    // Check columns
    for (let j = 0; j < cols; j++) {
      if (newMarkedCells.every(row => row[j])) {
        newBingoLines.push([0, j, rows - 1, 'col']);
      }
    }

    // Check main diagonal
    if (newMarkedCells.every((row, i) => row[i])) {
      newBingoLines.push([0, 0, rows - 1, 'diag']);
    }

    // Check anti-diagonal
    if (newMarkedCells.every((row, i) => row[cols - 1 - i])) {
      newBingoLines.push([0, cols - 1, rows - 1, 'antidiag']);
    }

    setBingoLines(newBingoLines);
    setScore(newBingoLines.length);
    return newBingoLines;
  };

  const generateGrid = (rows: number, cols: number) => {
    const totalCells = rows * cols;
    // Create array with sequential numbers
    const numbers = Array.from({ length: totalCells }, (_, i) => i + 1);
    
    // Shuffle array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    const newGrid: number[][] = [];
    const newMarkedCells: boolean[][] = [];
    
    // Fill grid with shuffled numbers
    for (let i = 0; i < rows; i++) {
      newGrid[i] = numbers.slice(i * cols, (i + 1) * cols);
      newMarkedCells[i] = new Array(cols).fill(false);
    }

    setGrid(newGrid);
    setMarkedCells(newMarkedCells);
    setBingoLines([]); // Initialize with empty array
    setScore(0); // Initialize score to 0
    saveGameState({ 
      grid: newGrid, 
      markedCells: newMarkedCells, 
      bingoLines: [], 
      score: 0 
    });
  };

  const markCell = (row: number, col: number) => {
    const newMarkedCells = markedCells.map((r, i) =>
      i === row ? r.map((cell, j) => (j === col ? !cell : cell)) : r
    );
    setMarkedCells(newMarkedCells);
    const newBingoLines = checkBingo(newMarkedCells);
    saveGameState({ grid, markedCells: newMarkedCells, bingoLines: newBingoLines, score: newBingoLines.length });
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
      saveGameState({ grid, markedCells, bingoLines, score });
    }
  }, [grid, markedCells]);

  return { grid, markedCells, bingoLines, score, markCell, resetGame };
};
