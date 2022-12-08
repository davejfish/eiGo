import styles from './MuncherInfo.css';

export default function MuncherInfo({ lives, points }) {
  return (
    <div className={styles.MuncherInfo}>
      <h3 className={'block'}>
        lives: {lives.map((life, index) => (
          <span key={index + 1}>{life}</span>
        ))}
      </h3>
      <h3 className={'block'}>
        points: {points}
      </h3>
    </div>
  );
}
