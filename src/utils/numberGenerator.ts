export const generateRandomNumbers = (rows: number, cols: number): number[][] => {
  const totalCells = rows * cols;
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
  
  // Shuffle array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  
  // Take first rows*cols numbers and create grid
  const grid: number[][] = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = numbers.slice(i * cols, (i + 1) * cols);
  }
  
  return grid;
};
