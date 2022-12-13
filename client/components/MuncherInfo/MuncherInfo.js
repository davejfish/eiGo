import styles from './MuncherInfo.css';
import { motion } from 'framer-motion';
import LivesDisplay from '../LivesDisplay/LivesDisplay.js';
import ScoreDisplay from '../ScoreDisplay/ScoreDisplay.js';

export default function MuncherInfo({ lives, points }) {
  return (
    <motion.div className={styles.MuncherInfoLeft}>
      <LivesDisplay lives={lives} />
      <ScoreDisplay points={points} />
    </motion.div>
  );
}
