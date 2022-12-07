import { useEffect, useState } from 'react';
import newGame from '../GameState/muncherState.js';


export default function useWords() {
  const [targetSound, setTargetSound] = useState('e');
  const [difficulty, setDifficulty] = useState('E1');
  const [game, setGame] = useState(null);
  const [loadingGame, setLoadingGame] = useState(true);
  const [muncherError, setMuncherError] = useState(null);

  useEffect(() => {
    const getWords = async () => {
      try {
        setLoadingGame(true);
        const game = await newGame(difficulty, targetSound);
        console.log('new game is: ', game);
        setGame(game);
        setLoadingGame(false);
      } catch (err) {
        setWordError(err.message);
        setLoadingGame(false);
      }
    };
    if (difficulty && targetSound)
      getWords();
  }, [difficulty, targetSound]);
  return { 
    targetSound, setTargetSound,
    difficulty, setDifficulty,
    game, setGame,
    loadingGame,
    muncherError,
  };
}
