import { useState } from 'react';
import { useUser } from '../../context/UserContext.js';
import { useMuncher } from '../../hooks/useMuncher.js';
import { enforceUser } from '../../services/UserService.js';
import GameOver from '../GameOver/GameOver.js';
import MuncherGrid from '../MuncherGrid/MuncherGrid.js';
import SpeechControls from '../SpeechControls/SpeechControls.js';
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

  return (
    <div>
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
      <SpeechControls />
      <SpeechToText game={game} handleEat={handleEat} handleMove={handleMove} curPos={currentPosition} />
      {gameover ? 
        <GameOver 
          resetGame={resetGame} 
          points={points} 
          gameover={gameover} 
          targetSound={targetSound}
          setTargetSound={setTargetSound}
          difficulty={difficulty}
          setDifficulty={setDifficulty} /> :
        <MuncherGrid 
          game={game} 
          loadingGame={loadingGame} 
          handleMove={handleMove} 
          currentPosition={currentPosition} />}
    </div>
  );
}
