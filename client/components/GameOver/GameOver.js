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
  setPlayingMusic }) {
  
  setPlayingMusic(false);

  const getRandomPhonics = (arr) => {
    setTargetGroup(arr);
    arr = arr.split(' ');
    setTargetSound(arr[Math.floor(Math.random() * arr.length)]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get('phonics') == null)
      return alert('please select phonics');
    getRandomPhonics(formData.get('phonics'));
    resetGame();
  };
    
  return (
    <motion.div className={`${styles.GameOverContainer} box modal is-active`} 
      initial={{ opacity: 0 }} 
      animate={{ transition: { duration: 2 }, opacity: 1 }}>
      {gameover && <div className={`${styles.theContent}`}>
        <h2 className={'title is-size-1'} >
          Game Over!
        </h2>
        <h2 className={'is-size-3'}>total points: {points}</h2>
        <form className={`${styles.gameoverForm}`} onSubmit={(e) => handleSubmit(e)}>
          <label className={'label is-size-3'}>difficulty</label>
          <div className={`select is-rounded ${styles.foo}`}> 
            <select name='difficulty' required defaultValue={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option disabled value={null}>-</option>
              <option value='E1'>3 letter words</option>
              <option value='E2'>4-5 letter words</option>
            </select>
          </div>
          <label className={'label is-size-3'}>phonics</label>
          <div className={`select is-rounded ${styles.foo}`}>
            <select name='phonics' required >
              <option disabled selected value={null}>-</option>
              {difficulty === 'E1' ? singlePhonics.map(phonics => (
                <option key={phonics} value={phonics}>{phonics}</option>
              )) : 
                doublePhonics.map(phonics => (
                  <option key={phonics} value={phonics}>{phonics}</option>
                ))}
            </select>
          </div>
          <div className={`${styles.GameOverButton}`}>
            <button className={'button'}>
            Play again?
            </button>
          </div>
        </form>
      </div>}
    </motion.div>
  );
};
