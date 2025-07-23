import { useState } from 'react';
import styles from './HelpTooltip.module.css';

interface HelpTooltipProps {
  text: string;
}

export const HelpTooltip: React.FC<HelpTooltipProps> = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={styles.helpContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)} // For mobile devices
    >
      <span className={styles.helpIcon}>?</span>
      {isVisible && (
        <div className={styles.tooltip}>
          {text}
        </div>
      )}
    </div>
  );
};
