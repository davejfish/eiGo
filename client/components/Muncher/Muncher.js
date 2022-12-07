import { useState } from 'react';
import { useUser } from '../../context/UserContext.js';
import { useMuncher } from '../../hooks/useMuncher.js';
import { enforceUser } from '../../services/UserService.js';
import SpeechToText from '../SpeechToText/SpeechToText.js';
import styles from './Muncher.css';

export default function Muncher() {
  const { user, loading } = useUser();
  enforceUser(user, loading);

  const { 
    game,  
    targetSound, setTargetSound,
    difficulty, setDifficulty,
    points, 
    lives, 
    gameover,
    currentPosition,
    loadingGame,
    resetGame,
    handleMove,
    handleEat,
  } = useMuncher();

  if (gameover) {
    setTargetSound(null);
    setDifficulty(null);
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
        {targetSound}
      </h2>
      <h3>
        lives: {lives.map((life, index) => (
          <span key={index + 1}>{life}</span>
        ))}
      </h3>
      <h3>
        points: {points}
      </h3>
      <SpeechToText game={game} handleEat={handleEat} handleMove={handleMove} curPos={currentPosition} />
      <div className={`${styles.muncherGrid}`} style={{ display: 'grid' }}>
        {loadingGame ? <h2>loading...</h2> : game.map((square) => (
          <div key={square.position} className={styles.square} onClick={(e) => handleMove(square)}>
            <span>{square.word}</span>
            {square.position === currentPosition ? <span>player</span> : <></>}
          </div>
        ))}
      </div>
    </>
    
  );
}
