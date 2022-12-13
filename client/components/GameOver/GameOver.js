import styles from './GameOver.css';
import { motion } from 'framer-motion';
import { doublePhonics, singlePhonics } from '../../utils/wordUtils.js';

export default function GameOver({ 
  gameover, 
  points, 
  resetGame, 
  targetSound, setTargetSound,
  setTargetGroup, 
  difficulty, setDifficulty,
  setPlayingMusic, stop }) {
  
  stop();
  setPlayingMusic(false);

  const getRandomPhonics = (arr) => {
    setTargetGroup(arr);
    arr = arr.split(' ');
    setTargetSound(arr[Math.floor(Math.random() * arr.length)]);
  };
    
  return (
    <motion.div className={`${styles.GameOverContainer} box modal is-active`} 
      initial={{ opacity: 0 }} 
      animate={{ transition: { duration: 2 }, opacity: 1 }}>
      {gameover && <div className={`${styles.theContent}`}>
        <h2 className={'title'} >
          Game Over!
        </h2>
        <h2>total points: {points}</h2>
        <label className={'label'}>difficulty</label>
        <div className={`select is-rounded ${styles.foo}`}> 
          <select defaultValue={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value={null}>-</option>
            <option value='E1'>3 letter words</option>
            <option value='E2'>4-5 letter words</option>
          </select>
        </div>
        <label className={'label'}>phonics</label>
        <div className={`select is-rounded ${styles.foo}`}>
          <select defaultValue={targetSound} onChange={(e) => getRandomPhonics(e.target.value)}>
            <option value={null}>-</option>
            {difficulty === 'E1' ? singlePhonics.map(phonics => (
              <option key={phonics} value={phonics}>{phonics}</option>
            )) : 
              doublePhonics.map(phonics => (
                <option key={phonics} value={phonics}>{phonics}</option>
              ))}
          </select>
        </div>
        <div className={`${styles.GameOverButton}`}>
          <button className={'button is-info'} onClick={resetGame}>
            Play again?
          </button>
        </div>
      </div>}
    </motion.div>
  );
};
