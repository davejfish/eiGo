import { default as SpeechRecognition, useSpeechRecognition } from 'react-speech-recognition';
import styles from './SpeechControls.css';

export default function SpeechControls() {

  const {
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const listenContinuously = () => {
    SpeechRecognition.default.startListening({
      continuous: true,
      language: 'en-US'
    });
  };

  return (
    <div className={styles.speechContainer}>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={listenContinuously}>listen</button>
      <button onClick={SpeechRecognition.default.stopListening}>Stop</button>
    </div>
  );
}
