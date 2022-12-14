import { useEffect, useState } from 'react';
import newGame from '../GameState/muncherState.js';

export default function useWords() {
  const [targetSound, setTargetSound] = useState(null);
  const [targetGroup, setTargetGroup] = useState(null);
  const [difficulty, setDifficulty] = useState('E1');
  const [game, setGame] = useState(null);
  const [loadingGame, setLoadingGame] = useState(true);
  const [muncherError, setMuncherError] = useState(null);

  useEffect(() => {
    const getWords = async () => {
      try {
        setLoadingGame(true);
        const game = await newGame(difficulty, targetSound);
        setGame(game);
        setLoadingGame(false);
      } catch (err) {
        setMuncherError(err.message);
        setLoadingGame(false);
      }
    };
    if (difficulty && targetSound) {
      getWords();
    }
      
  }, [difficulty, targetSound]);
  return { 
    targetSound, setTargetSound,
    targetGroup, setTargetGroup,
    difficulty, setDifficulty,
    game, setGame,
    loadingGame,
    muncherError,
  };
}
