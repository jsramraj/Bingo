import { useState } from 'react';
import type { FC } from 'react';
import styles from './GridSizeForm.module.css';
import { MIN_GRID_SIZE, MAX_GRID_SIZE } from '../constants';
import { trackEvent } from '../analytics';

interface GridSizeFormProps {
  onSubmit: (rows: number, cols: number, maxNumber: number) => void;
  initialRows?: number;
  initialCols?: number;
  initialMaxNumber?: number;
}

export const GridSizeForm: FC<GridSizeFormProps> = ({ 
  onSubmit, 
  initialRows = 3, 
  initialCols = 3, 
  initialMaxNumber = 9 
}) => {
  const [rows, setRows] = useState(initialRows);
  const [cols, setCols] = useState(initialCols);
  const [maxNumber, setMaxNumber] = useState(initialMaxNumber);

  const handleIncrement = (setter: (value: number) => void, current: number) => {
    if (current < MAX_GRID_SIZE) {
      setter(current + 1);
    }
  };

  const handleDecrement = (setter: (value: number) => void, current: number) => {
    if (current > MIN_GRID_SIZE) {
      setter(current - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minRequired = rows * cols;
    if (maxNumber < minRequired) {
      alert(`Maximum number must be at least ${minRequired} (rows × columns)`);
      return;
    }
    trackEvent('grid_config', { rows, cols, maxNumber });
    onSubmit(rows, cols, maxNumber);
  };

  const handleMaxNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
      setMaxNumber(value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="maxNumber">Maximum Number (min: {rows * cols})</label>
        <input
          type="number"
          id="maxNumber"
          className={styles.numberInput}
          value={maxNumber}
          onChange={handleMaxNumberChange}
          min={rows * cols}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="rows">Rows</label>
        <div className={styles.counterControl}>
          <button 
            type="button" 
            className={styles.controlButton}
            onClick={() => handleDecrement(setRows, rows)}
            disabled={rows <= MIN_GRID_SIZE}
          >
            −
          </button>
          <span className={styles.numberDisplay}>{rows}</span>
          <button 
            type="button" 
            className={styles.controlButton}
            onClick={() => handleIncrement(setRows, rows)}
            disabled={rows >= MAX_GRID_SIZE}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="cols">Columns</label>
        <div className={styles.counterControl}>
          <button 
            type="button" 
            className={styles.controlButton}
            onClick={() => handleDecrement(setCols, cols)}
            disabled={cols <= MIN_GRID_SIZE}
          >
            −
          </button>
          <span className={styles.numberDisplay}>{cols}</span>
          <button 
            type="button" 
            className={styles.controlButton}
            onClick={() => handleIncrement(setCols, cols)}
            disabled={cols >= MAX_GRID_SIZE}
          >
            +
          </button>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Create Game
      </button>
    </form>
  );
};
