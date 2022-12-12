import { useUser } from '../../context/UserContext.js';
import { useMuncher } from '../../hooks/useMuncher.js';
import { enforceUser } from '../../services/UserService.js';
import GameOver from '../GameOver/GameOver.js';
import Landing from '../Landing/Landing.js';
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
    playMuncherMusic,
    playingMusic, setPlayingMusic,
  } = useMuncher();

  return (
    <>
      {targetSound && difficulty ? <div className={`${styles.MuncherGame}`}>
        <div className={styles.MuncherInfo}>
          <MuncherInfo lives={lives} points={points} />
          <h2 className={'title'}>
            {targetSound}
          </h2>
          <SpeechControls />
        </div>
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
        : <Landing 
          targetSound={targetSound}
          setTargetSound={setTargetSound}
          difficulty={difficulty}
          setDifficulty={setDifficulty} />}
    </>
  );
}
