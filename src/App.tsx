import { useState } from 'react';
import './App.css';
import { BingoGrid } from './components/BingoGrid';
import { GridSizeForm } from './components/GridSizeForm';
import { useBingoGame } from './hooks/useBingoGame';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const { grid, markedCells, markCell, resetGame } = useBingoGame(3, 3);

  const handleGridSizeSubmit = (rows: number, cols: number) => {
    resetGame(rows, cols);
    setGameStarted(true);
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
            onCellClick={markCell}
          />
          <button className="reset-button" onClick={() => setGameStarted(false)}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App
