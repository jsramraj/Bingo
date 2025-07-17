import { useState } from 'react';
import type { FC } from 'react';
import styles from './GridSizeForm.module.css';

interface GridSizeFormProps {
  onSubmit: (rows: number, cols: number) => void;
}

export const GridSizeForm: FC<GridSizeFormProps> = ({ onSubmit }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const MIN_SIZE = 3;
  const MAX_SIZE = 6;

  const handleIncrement = (setter: (value: number) => void, current: number) => {
    if (current < MAX_SIZE) {
      setter(current + 1);
    }
  };

  const handleDecrement = (setter: (value: number) => void, current: number) => {
    if (current > MIN_SIZE) {
      setter(current - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rows, cols);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="rows">Rows</label>
        <div className={styles.counterControl}>
          <button 
            type="button" 
            className={styles.controlButton}
            onClick={() => handleDecrement(setRows, rows)}
            disabled={rows <= MIN_SIZE}
          >
            −
          </button>
          <span className={styles.numberDisplay}>{rows}</span>
          <button 
            type="button" 
            className={styles.controlButton}
            onClick={() => handleIncrement(setRows, rows)}
            disabled={rows >= MAX_SIZE}
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
            disabled={cols <= MIN_SIZE}
          >
            −
          </button>
          <span className={styles.numberDisplay}>{cols}</span>
          <button 
            type="button" 
            className={styles.controlButton}
            onClick={() => handleIncrement(setCols, cols)}
            disabled={cols >= MAX_SIZE}
          >
            +
          </button>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Create Bingo Grid
      </button>
    </form>
  );
};
