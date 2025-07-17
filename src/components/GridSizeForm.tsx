import { useState } from 'react';
import type { FC } from 'react';
import styles from './GridSizeForm.module.css';

interface GridSizeFormProps {
  onSubmit: (rows: number, cols: number) => void;
}

export const GridSizeForm: FC<GridSizeFormProps> = ({ onSubmit }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rows, cols);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="rows">Rows:</label>
        <input
          type="number"
          id="rows"
          min="3"
          max="6"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="cols">Columns:</label>
        <input
          type="number"
          id="cols"
          min="3"
          max="6"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
        />
      </div>
      <button type="submit">Create Bingo Grid</button>
    </form>
  );
};
