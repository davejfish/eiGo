import { useUser } from '../../context/UserContext.js';
import { useMuncher } from '../../hooks/useMuncher.js';
import { enforceUser } from '../../services/UserService.js';
import GameOver from '../GameOver/GameOver.js';
import MuncherGrid from '../MuncherGrid/MuncherGrid.js';
import MuncherInfo from '../MuncherInfo/MuncherInfo.js';
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
    <div className={`${styles.MuncherGame}`}>
      <h2 className={'title'}>
        {targetSound}
      </h2>
      <MuncherInfo lives={lives} points={points} />
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
        <></>}
      <MuncherGrid 
        game={game} 
        loadingGame={loadingGame} 
        handleMove={handleMove} 
        currentPosition={currentPosition} />
    </div>
  );
}
