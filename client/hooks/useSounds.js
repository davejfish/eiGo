import useSound from 'use-sound';
import { Howl, Howler } from 'howler';
import correct from './sounds/correct.mp3';
import wrong from './sounds/wrong.mp3';
import jump from './sounds/jump.mp3';
import muncherMusic from './sounds/game-music.mp3';
import gameover from './sounds/gameover.mp3';
import newWords from './sounds/newWords.mp3';
import { useEffect, useState } from 'react';

export function useSounds() {
  const [playCorrect] = useSound(correct);
  const [playWrong] = useSound(wrong, { volume: 0.2 });
  const [playJump] = useSound(jump);
  const [playGameover] = useSound(gameover);
  const [playNewWords] = useSound(newWords);
  const [sound, setSound] = useState(null);
  
  useEffect(() => {
    const playMuncherMusic = new Howl({
      src: [muncherMusic],
      loop: true,
      volume: 0.1,
    });
    setSound(playMuncherMusic);
  }, []);

  return { 
    playCorrect, 
    playWrong, 
    playJump, 
    sound,
    playGameover, 
    playNewWords
  };
};
