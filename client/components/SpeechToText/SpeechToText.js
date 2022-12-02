import { default as SpeechRecognition, useSpeechRecognition } from 'react-speech-recognition';
import styles from './SpeechToText.css';

export default function SpeechToText() { 

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const listenContinuously = () => {
    SpeechRecognition.default.startListening({
      continuous: true,
      language: 'en-US'
    });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser does not support speech recognition.</span>;
  }

  return (
    <div className={styles.speechContainer}>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={listenContinuously}>listen</button>
      <button onClick={SpeechRecognition.default.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <h3>your speech</h3>
      <p>{transcript.toLowerCase()}</p>
    </div>
  );
}
