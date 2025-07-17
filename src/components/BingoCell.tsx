import type { FC } from 'react';
import styles from './BingoCell.module.css';

interface BingoCellProps {
  number: number;
  isMarked: boolean;
  onClick: () => void;
}

export const BingoCell: FC<BingoCellProps> = ({ number, isMarked, onClick }) => {
  return (
    <button 
      className={`${styles.cell} ${isMarked ? styles.marked : ''}`}
      onClick={onClick}
    >
      {number}
    </button>
  );
};
