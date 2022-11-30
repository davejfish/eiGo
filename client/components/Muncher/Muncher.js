import { useState } from 'react';
import { useUser } from '../../context/UserContext.js';
import { useMuncher } from '../../hooks/useMuncher.js';
import { enforceUser } from '../../services/UserService.js';
import styles from './Muncher.css';

export default function Muncher() {
  const { user, loading } = useUser();
  enforceUser(user, loading);

  const { 
    game, 
    handleClick, 
    targetSound, setTargetSound, 
    points, 
    lives, 
    gameover,
    resetGame,
  } = useMuncher();

  if (gameover) {
    return (
      <div>
        <h2 className={'title'} >
          Game Over!
        </h2>
        <h2>total points: {points}</h2>
        <div>
          <button onClick={resetGame}>
            Play again?
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className={'title'}>
        {targetSound} as in bee
      </h2>
      <h3>
        lives: {lives.map((life, index) => (
          <span key={index + 1}>{life}</span>
        ))}
      </h3>
      <h3>
        points: {points}
      </h3>
      <div className={`${styles.muncherGrid}`} style={{ display: 'grid' }}>
        {game.map((square) => (
          <div key={square.position} className={styles.square} onClick={(e) => handleClick(e, square)}>
            <span>{square.word}</span>
          </div>
        ))}
      </div>
    </>
    
  );
}
