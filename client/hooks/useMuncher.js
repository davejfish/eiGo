import { useState } from 'react';
import newGame from '../GameState/muncherState.js';
import useWords from './useWords.js';

export function useMuncher() {
  const {
    targetSound, setTargetSound,
    difficulty, setDifficulty,
    game, setGame,
    loadingGame,
    muncherError,
  } = useWords();
  const [gameover, setGameover] = useState(false);
  const [matchesLeft, setMatchesLeft] = useState(4);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(['x', 'x', 'x']);
  const [currentPosition, setCurrentPosition] = useState(0);

  const checkMatches = () => {
    // when resetting the phonics fetch a whole new game for those sounds
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
    if (sign === '+') {
      setPoints(prev => prev + 200);
    }
    else {
      setPoints(prev => prev - 200);
    }
  };

  const decrementLives = () => {
    lives.pop();
    setLives([...lives]);
  };

  const resetGame = () => {
    setGameover(false);
    setPoints(0);
    setMatchesLeft(4);
    setLives(['x', 'x', 'x']);
    setCurrentPosition(0);
    setTargetSound('a');
  };

  const hasSubstring = (word) => {
    console.log('word is: ', word);

    // if the word exists check for indexOf
    // if it is -1 return false, otherwise true
    if (word !== null) {
      return word.indexOf(targetSound) !== -1 ? true : false;
    }
    return false;
    
    // const result = new RegExp(word).test(targetSound);
  };

  // refactor to include hasSubstring
  const handleEat = (box) => {
    if (hasSubstring(box.word)) {
      calculatePoints('+');
      setMatchesLeft(prev => prev - 1);
      checkMatches();
      game[box.position].word = null;
      setGame([...game]);
      return;
    } 
    calculatePoints('-');
    decrementLives();
    if (lives.length <= 0){
      setGameover(true);
    }
    return;
  };

  // can modify data to have numbers supporting can move here from foo instead of
  // can move to logic
  function canMove(box) {
    // if box.position is bigger I am trying to move right or down
    // if currentpos + 1 === box.right return true
    // if curpos + 6 === bod.down return true

    // if box.position is lower I am trying to move left or up
    // if current pos - 1 === box.left return true
    // if current pos - 6 === box.up return true

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
    if (box.position === currentPosition) {
      hasSubstring(box.word);
      handleEat(box);
    }
    else {
      if (canMove(box))
        setCurrentPosition(box.position);
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
  };

}
