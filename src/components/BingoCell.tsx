import type { FC } from 'react';
import styles from './BingoCell.module.css';

interface BingoCellProps {
  number: number;
  isMarked: boolean;
  isBingo?: boolean;
  onClick: () => void;
}

export const BingoCell: FC<BingoCellProps> = ({ number, isMarked, isBingo, onClick }) => {
  return (
    <button 
      className={`${styles.cell} ${isMarked ? styles.marked : ''} ${isBingo ? styles.bingo : ''}`}
      onClick={onClick}
    >
      {number}
    </button>
  );
};
