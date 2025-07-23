import { useState, useEffect } from 'react';
import './App.css';
import { BingoGrid } from './components/BingoGrid';
import { GridSizeForm } from './components/GridSizeForm';
import { ScoreAnimation } from './components/ScoreAnimation';
import { GameInstructions } from './components/GameInstructions';
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
  
  // Track score changes to trigger animations
  const [lastScore, setLastScore] = useState(0);
  const [animationCounter, setAnimationCounter] = useState(0);
  const [isFirstUpdate, setIsFirstUpdate] = useState(true);
  
  // Detect score changes and trigger animation
  useEffect(() => {
    if (isFirstUpdate) {
      // Skip the first update to avoid animation on initial load
      setIsFirstUpdate(false);
      setLastScore(score);
      return;
    }
    
    console.log(`App: score=${score}, lastScore=${lastScore}`);
    // Only trigger for positive score increases (not on initial load or reset)
    if (score > lastScore && score > 0) {
      setAnimationCounter(prev => prev + 1);
    }
    // Always update the last score
    setLastScore(score);
  }, [score, lastScore, isFirstUpdate]);

  const handleGridSizeSubmit = (rows: number, cols: number, maxNumber: number) => {
    resetGame(rows, cols, maxNumber);
    setGameStarted(true);
    localStorage.setItem('bingo-game-started', 'true');
    
    // Clear URL parameters when starting the game
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="app">
      <GameInstructions />
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
            // Reset game state
            resetGame(3, 3, 9);
            setLastScore(0);
            setIsFirstUpdate(true);
            setGameStarted(false);
            localStorage.removeItem('bingo-game-started');
          }}>
            New Game
          </button>
          <ScoreAnimation score={animationCounter} />
        </div>
      )}
    </div>
  );
}

export default App
