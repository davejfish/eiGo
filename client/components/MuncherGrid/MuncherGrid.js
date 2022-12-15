import styles from './MuncherGrid.css';
import player from './ranger_yellow.png';
import { motion } from 'framer-motion';
import Loading from '../Loading/Loading.js';

export default function MuncherGrid({ game, loadingGame, handleMove, currentPosition }) {

  if (loadingGame) {
    return <Loading />;
  }
    

  return (
    <div className={`${styles.muncherGrid}`} style={{ display: 'grid' }}>
      {game.map((square) => (
        <motion.div animate={{
          scale: [1, 1.1, .9, 1],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }} 
        key={square.position} 
        className={`${styles.square}`} 
        onClick={(e) => handleMove(square)}>
          <span className={'is-size-4'}>{square.word}</span>
          {square.position === currentPosition ? <img src={player} /> : <></>}
        </motion.div>
      ))}
    </div>
  );
};
