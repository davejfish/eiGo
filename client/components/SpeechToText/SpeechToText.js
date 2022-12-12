import { default as SpeechRecognition, useSpeechRecognition } from 'react-speech-recognition';
import styles from './SpeechToText.css';

export default function SpeechToText({ game, handleMove, handleEat, curPos }) { 

  function findWord(word) {
    if (game[curPos + 1])
      if (game[curPos + 1].word === word) {
        return game[curPos + 1];
      }
    if (game[curPos + 6])
      if (game[curPos + 6].word === word) {
        return game[curPos + 6];
      }
    if (game[curPos - 1])
      if (game[curPos - 1].word === word) {
        return game[curPos - 1];
      }
    if (game[curPos - 6])
      if (game[curPos - 6].word === word) {
        return game[curPos - 6];
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
    <div className={styles.transcript}>
      <h2 >command:</h2>
      <h2>{transcript}</h2>
    </div>
  );
}
