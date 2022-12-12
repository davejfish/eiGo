import { useState } from 'react';
import newGame from '../GameState/muncherState.js';
import { useSounds } from './useSounds.js';
import useWords from './useWords.js';

export function useMuncher() {
  const [gameover, setGameover] = useState(false);
  const [matchesLeft, setMatchesLeft] = useState(4);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(['x', 'x', 'x']);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playingMusic, setPlayingMusic] = useState(false);
  const { playCorrect, playWrong, playJump, playMuncherMusic, playGameover } = useSounds();
  const {
    targetSound, setTargetSound,
    difficulty, setDifficulty,
    game, setGame,
    loadingGame,
    muncherError,
  } = useWords();

  // add logic to select a new phonics from phonic group
  const checkMatches = () => {
    if (matchesLeft < 1) {
      if (targetSound === 'ee') {
        setTargetSound('ea');
        setMatchesLeft(4);
      }
      else {
        setTargetSound('ee');
        setMatchesLeft(4);
      }
    }
  };

  const calculatePoints = (sign) => {
    sign === '+' ? setPoints(prev => prev + 200) : setPoints(prev => prev - 200);
  };

  const decrementLives = () => {
    lives.pop();
    setLives([...lives]);
  };

  const resetGame = async () => {
    setGameover(false);
    setPoints(0);
    setMatchesLeft(4);
    setLives(['x', 'x', 'x']);
    setCurrentPosition(0);
    setGame(await newGame(difficulty, targetSound));
  };

  // const result = new RegExp(word).test(targetSound);
  const hasSubstring = (word) => {
    console.log('word is: ', word);
    if (word !== null) {
      return word.indexOf(targetSound) !== -1 ? true : false;
    }
    return false;
  };

  // refactor to include hasSubstring
  const handleEat = (box) => {
    if (hasSubstring(box.word)) {
      playCorrect();
      calculatePoints('+');
      setMatchesLeft(prev => prev - 1);
      checkMatches();
      game[box.position].word = null;
      setGame([...game]);
      return;
    } 
    playWrong();
    calculatePoints('-');
    decrementLives();
    if (lives.length <= 0){
      setGameover(true);
      playGameover();
    }
    return;
  };

  function canMove(box) {
    if (box.position > currentPosition) {
      if (currentPosition + 1 === game[box.position - 1].right)
        return true;
      if (currentPosition + 6 === game[box.position - 6].down)
        return true;
      return false;
    }
    if (box.position < currentPosition) {
      if (currentPosition - 1 === game[box.position + 1].left)
        return true;
      if (currentPosition - 6 === game[box.position + 6].up)
        return true;
      return false;
    }
    return false;
  }

  const handleMove = (box) => {
    if (gameover)
      return;
    if (box.position === currentPosition) {
      hasSubstring(box.word);
      handleEat(box);
    }
    else {
      if (canMove(box)) {
        setCurrentPosition(box.position);
        playJump();
      }
    }
  };

  return { 
    game, setGame, 
    targetSound, setTargetSound, 
    difficulty, setDifficulty,
    points, 
    lives, 
    gameover,
    currentPosition,
    loadingGame,
    resetGame,
    handleMove, handleEat,
    playMuncherMusic,
    playingMusic, setPlayingMusic
  };

}
