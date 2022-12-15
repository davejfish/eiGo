import { default as SpeechRecognition, useSpeechRecognition } from 'react-speech-recognition';
import styles from './SpeechToText.css';

export default function SpeechToText({ game, handleMove, handleEat, curPos }) { 

  function findWord(word) {
    switch (word) {
      case 'up':
        if (game[curPos - 6]) 
          return game[curPos - 6];
        else return null;
      case 'down':
        if (game[curPos + 6])
          return game[curPos + 6];
        else return null;
      case 'left':
        if (game[curPos - 1])
          return game[curPos - 1];
        else return null;
      case 'right':
        if (game[curPos + 1])
          return game[curPos + 1];
        else return null;
    }
  }

  // set Error to display a message to user if command is not correct
  const handleMoveByVoice = (word) => {
    const match = findWord(word);
    if (match) {
      handleMove(match);
    }
    resetTranscript();
  };

  const handleEatByVoice = (word) => {
    handleEat(game[curPos]);
    resetTranscript();
  };

  const handleClearTranscript = () => {
    resetTranscript();
  };

  const commands = [
    {
      command: 'move :word',
      callback: (word) => handleMoveByVoice(word)
    },
    {
      command: 'eat :word',
      callback: (word) => handleEatByVoice(word)
    },
    {
      command: 'clear text',
      callback: () => handleClearTranscript()
    }
  ];

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className={`${styles.transcript} is-size-3`}>
      <h2 >command:</h2>
      <h2>{transcript}</h2>
    </div>
  );
}
