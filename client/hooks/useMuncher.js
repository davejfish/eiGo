import { useState } from 'react';
import newGame from '../GameState/muncherState.js';


export function useMuncher() {
  // I need to hand a new array to react
  // will get moved to a hook eventually?
  const [game, setGame] = useState(newGame);
  const [targetSound, setTargetSound] = useState('ee');
  const [gameover, setGameover] = useState(false);
  const [matchesLeft, setMatchesLeft] = useState(4);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(['x', 'x', 'x']);

  // get these targets from a fetch?
  const targets = ['ee', 'ea', 'oo', 'ou'];

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
    setTargetSound('ee');
    // need to get a whole new game here otherwise it continues the same game
    setGame(newGame);
  };

  const handleClick = (e, box) => {
    if (box.word === '') return;
    const update = targetSound === box.phonics ? '' : box.word;
    if (update === box.word) {
      // add a class, set a timeout then remove that class
      // e.target.classList.add();
      calculatePoints('-');
      decrementLives();
      if (lives.length <= 0){
        setGameover(true);
      }
      return;
    } 
    calculatePoints('+');
    setMatchesLeft(prev => prev - 1);
    checkMatches();
    game[box.position].word = update;
    setGame([...game]);
  };

  return { 
    game, setGame, 
    targetSound, setTargetSound, 
    handleClick, 
    points, 
    lives, 
    gameover,
    resetGame,
  };

}
