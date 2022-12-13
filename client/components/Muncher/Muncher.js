import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { useMuncher } from '../../hooks/useMuncher.js';
import { enforceUser } from '../../services/UserService.js';
import GameOver from '../GameOver/GameOver.js';
import Landing from '../Landing/Landing.js';
import MuncherGrid from '../MuncherGrid/MuncherGrid.js';
import MuncherInfo from '../MuncherInfo/MuncherInfo.js';
import SpeechControls from '../SpeechControls/SpeechControls.js';
import SpeechToText from '../SpeechToText/SpeechToText.js';
import TargetSound from '../TargetSound/TargetSound.js';
import styles from './Muncher.css';


export default function Muncher() {
  const { user, loading } = useUser();
  enforceUser(user, loading);

  const { 
    game,  
    targetSound, setTargetSound,
    targetGroup, setTargetGroup,
    difficulty, setDifficulty,
    points, 
    lives, 
    gameover,
    currentPosition,
    loadingGame,
    resetGame,
    handleMove,
    handleEat,
    playMuncherMusic, stop,
    playingMusic, setPlayingMusic,
  } = useMuncher();

  if (playingMusic === false && gameover === false && game) {
    playMuncherMusic();
    setPlayingMusic(true);
  }

  return (
    <>
      {user === undefined && loading === false && <Navigate to='/auth/sign-in' />}
      {targetSound && difficulty ? <div className={`${styles.MuncherGame}`}>
        <div className={styles.MuncherInfo}>
          <MuncherInfo lives={lives} points={points} />
          <TargetSound targetSound={targetSound} />
          <SpeechControls />
        </div>
        <SpeechToText 
          game={game} 
          handleEat={handleEat} 
          handleMove={handleMove} 
          curPos={currentPosition} />
        {gameover ? 
          <GameOver 
            resetGame={resetGame} 
            points={points} 
            gameover={gameover} 
            targetSound={targetSound}
            setTargetSound={setTargetSound}
            setTargetGroup={setTargetGroup}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            setPlayingMusic={setPlayingMusic}
            stop={stop} /> :
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
          setTargetGroup={setTargetGroup}
          difficulty={difficulty}
          setDifficulty={setDifficulty} />}
    </>
  );
}
