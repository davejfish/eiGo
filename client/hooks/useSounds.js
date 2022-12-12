import useSound from 'use-sound';
import correct from './sounds/correct.mp3';
import wrong from './sounds/wrong.mp3';
import jump from './sounds/jump.mp3';
import muncherMusic from './sounds/game-music.mp3';
import gameover from './sounds/gameover.mp3';
import newWords from './sounds/newWords.mp3';

export function useSounds() {
  const [playCorrect] = useSound(correct);
  const [playWrong] = useSound(wrong, { volume: 0.5 });
  const [playJump] = useSound(jump);
  const [playMuncherMusic] = useSound(muncherMusic, { volume: 0.5 });
  const [playGameover] = useSound(gameover);
  const [playNewWords] = useSound(newWords);

  return { playCorrect, playWrong, playJump, playMuncherMusic, playGameover, playNewWords };
};
