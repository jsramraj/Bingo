import { useState } from 'react';
import './App.css';
import { BingoGrid } from './components/BingoGrid';
import { GridSizeForm } from './components/GridSizeForm';
import { useBingoGame } from './hooks/useBingoGame';

function App() {
  console.log('App rendering');  // Add this line to debug
  const [gameStarted, setGameStarted] = useState(() => {
    const saved = localStorage.getItem('bingo-game-started');
    return saved === 'true';
  });
  const { grid, markedCells, bingoLines, score, markCell, resetGame } = useBingoGame(3, 3);

  const handleGridSizeSubmit = (rows: number, cols: number) => {
    resetGame(rows, cols);
    setGameStarted(true);
    localStorage.setItem('bingo-game-started', 'true');
  };

  return (
    <div className="app">
      <h1>Bingo Game</h1>
      {!gameStarted ? (
        <GridSizeForm onSubmit={handleGridSizeSubmit} />
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
