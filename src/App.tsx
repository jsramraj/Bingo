import { useState } from 'react';
import './App.css';
import { BingoGrid } from './components/BingoGrid';
import { GridSizeForm } from './components/GridSizeForm';
import { useBingoGame } from './hooks/useBingoGame';
import { MIN_GRID_SIZE, MAX_GRID_SIZE, MIN_MAX_NUMBER, MAX_MAX_NUMBER } from './constants';

function App() {
  // Read and validate URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  
  const validateRange = (value: number, min: number, max: number, defaultValue: number) => {
    return value >= min && value <= max ? value : defaultValue;
  };

  const urlRows = validateRange(
    parseInt(urlParams.get('rows') || '3', 10),
    MIN_GRID_SIZE,
    MAX_GRID_SIZE,
    3
  );
  
  const urlCols = validateRange(
    parseInt(urlParams.get('cols') || '3', 10),
    MIN_GRID_SIZE,
    MAX_GRID_SIZE,
    3
  );
  
  const urlMaxNumber = validateRange(
    parseInt(urlParams.get('max') || '9', 10),
    Math.max(MIN_MAX_NUMBER, urlRows * urlCols), // Ensure it's at least rows * cols
    MAX_MAX_NUMBER,
    9
  );

  const [gameStarted, setGameStarted] = useState(() => {
    return localStorage.getItem('bingo-game-started') === 'true';
  });

  const { grid, markedCells, bingoLines, score, markCell, resetGame } = useBingoGame(3, 3, 9);

  const handleGridSizeSubmit = (rows: number, cols: number, maxNumber: number) => {
    resetGame(rows, cols, maxNumber);
    setGameStarted(true);
    localStorage.setItem('bingo-game-started', 'true');
    
    // Clear URL parameters when starting the game
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="app">
      <h1>Bingo Game</h1>
      {!gameStarted ? (
        <GridSizeForm 
          onSubmit={handleGridSizeSubmit}
          initialRows={urlRows}
          initialCols={urlCols}
          initialMaxNumber={urlMaxNumber}
        />
      ) : (
        <div>
          <BingoGrid
            grid={grid}
            markedCells={markedCells}
            bingoLines={bingoLines}
            score={score}
            onCellClick={markCell}
          />
          <button className="reset-button" onClick={() => {
            setGameStarted(false);
            localStorage.removeItem('bingo-game-started');
          }}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App
