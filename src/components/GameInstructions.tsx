import { useState } from 'react';
import { trackEvent } from '../analytics';
import styles from './GameInstructions.module.css';

export const GameInstructions: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button 
        className={styles.helpButton}
        onClick={() => {
          setIsOpen(true);
          trackEvent('how_to_play_click');
        }}
        aria-label="How to Play"
      >
        How to Play
      </button>

      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close Instructions"
            >
              ×
            </button>
            <h2>How to Play Team Bingo</h2>
            
            <div className={styles.instructions}>
              <h3>Game Overview</h3>
              <p>This is an interactive team game where an instructor leads participants through a series of questions or statements. Players mark their bingo cards based on their honest responses, creating an engaging way to learn about each other!</p>

              <h3>Instructor's Role</h3>
              <ol>
                <li>Prepare a list of questions/statements (more than the grid size for variety)</li>
                <li>Choose the grid size based on your question count (e.g., 5×5 needs 25+ questions)</li>
                <li>Share the grid settings with all participants</li>
                <li>Present questions in any order, for example:
                  <ul>
                    <li>"If you've ever mentored someone, mark number 1"</li>
                    <li>"If you've missed a critical deadline, mark number 2"</li>
                    <li>And so on...</li>
                  </ul>
                </li>
              </ol>

              <h3>Setting Up Your Grid</h3>
              <ol>
                <li>Use the same grid size as specified by the instructor</li>
                <li>Each player gets a unique grid with random number placement</li>
                <li>Some numbers might appear in your grid while missing from others - that's part of the fun!</li>
              </ol>

              <h3>Playing the Game</h3>
              <ol>
                <li>Listen to each question/statement from the instructor</li>
                <li>If the statement applies to you, find and mark the corresponding number</li>
                <li>Be honest with your responses - it makes the game more meaningful!</li>
                <li>Continue until the instructor has gone through all questions</li>
              </ol>

              <h3>Scoring & Winning</h3>
              <ul>
                <li>Earn 1 point for each completed line (horizontal, vertical, or diagonal)</li>
                <li>Players with perfect scores (all lines completed) win the game</li>
                <li>If no perfect scores, the highest scoring player wins</li>
                <li>Multiple winners are possible and add to the fun!</li>
              </ul>

              <h3>Tips for Success</h3>
              <ul>
                <li>Pay attention to each question - you might miss marking opportunities!</li>
                <li>Look for patterns in your grid that could complete multiple lines</li>
                <li>Share your experiences after the game - it's a great way to learn about your team</li>
                <li>Use the URL sharing feature to ensure everyone has the same grid settings</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
