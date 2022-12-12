import { useEffect, useState } from 'react';
import newGame from '../GameState/muncherState.js';
import { useSounds } from './useSounds.js';


export default function useWords() {
  const [targetSound, setTargetSound] = useState(null);
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
      console.log('getting words');
      getWords();
    }
      
  }, [difficulty, targetSound]);
  return { 
    targetSound, setTargetSound,
    difficulty, setDifficulty,
    game, setGame,
    loadingGame,
    muncherError,
  };
}
