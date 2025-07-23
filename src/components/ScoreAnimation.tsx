import { useEffect, useState, useRef } from 'react';
import styles from './ScoreAnimation.module.css';

interface ScoreAnimationProps {
  score: number;
}

export const ScoreAnimation: React.FC<ScoreAnimationProps> = ({ score }) => {
  // Animation states
  const [showScoreAnimation, setShowScoreAnimation] = useState(false);
  const [showBingoAnimation, setShowBingoAnimation] = useState(false);
  const [animationText, setAnimationText] = useState('');
  const [animationKey, setAnimationKey] = useState(0);
  const isFirstRender = useRef(true); // Track first render

  // Watch for score changes
  useEffect(() => {
    // Reset detection - if score is reset to 0, update our state but don't animate
    if (score === 0) {
      isFirstRender.current = true; // Reset first render flag to prevent animation on next score change
      setShowScoreAnimation(false);
      setShowBingoAnimation(false);
      return;
    }
    
    // Skip animation on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    console.log(`Score changed to: ${score}`);
    
    // Trigger score animation
    setAnimationText(`+1`);
    setShowScoreAnimation(true);
    setAnimationKey(prev => prev + 1); // Force new animation instance
    
    // Show BINGO! animation only when the score is greater than 0
    if (score > 0) {
      setShowBingoAnimation(true);
    }
    
    // Hide animations after they complete
    const scoreTimer = setTimeout(() => {
      setShowScoreAnimation(false);
    }, 1000);
    
    const bingoTimer = setTimeout(() => {
      setShowBingoAnimation(false);
    }, 1500);
    
    return () => {
      clearTimeout(scoreTimer);
      clearTimeout(bingoTimer);
    };
  }, [score]); // Only depend on score changes
  
  return (
    <>
      {showScoreAnimation && (
        <div className={styles.animationContainer} key={`score-${animationKey}`}>
          <div className={styles.scoreAnimation}>
            <span>{animationText}</span>
          </div>
        </div>
      )}
      
      {showBingoAnimation && (
        <div className={styles.animationContainer} key={`bingo-${animationKey}`}>
          <div className={styles.bingoAnimation}>
            <span>BINGO!</span>
          </div>
        </div>
      )}
    </>
  );
};
