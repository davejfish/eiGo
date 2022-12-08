import styles from './GameOver.css';
import { motion } from 'framer-motion';

export default function GameOver({ 
  gameover, 
  points, 
  resetGame, 
  targetSound, setTargetSound, 
  difficulty, setDifficulty }) {
    
  return (
    <motion.div className={'box'} 
      initial={{ opacity: 0 }} 
      animate={{ transition: { duration: 2 }, opacity: 1 }}>
      {gameover && <div>
        <h2 className={'title'} >
          Game Over!
        </h2>
        <h2>total points: {points}</h2>
        <div>
          <label className={'label'}>
            phonic group: 
            <select className={'select'} defaultValue={targetSound} onChange={(e) => setTargetSound(e.target.value)}>
              <option value={null}>-</option>
              <option value='a'>a</option>
              <option value='i'>i</option>
              <option value='u'>u</option>
              <option value='e'>e</option>
              <option value='o'>o</option>
            </select>
          </label>
          <label className={'label'}>
            difficulty: 
            <select className={'select'} defaultValue={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value={null}>-</option>
              <option value='E1'>3 letter words</option>
              <option value='E2'>4-5 letter words</option>
            </select>
          </label>
          
        </div>
        <div>
          <button className={'button is-info'} onClick={resetGame}>
            Play again?
          </button>
        </div>
      </div>}
    </motion.div>
  );
};
