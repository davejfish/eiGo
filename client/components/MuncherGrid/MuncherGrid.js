import styles from './MuncherGrid.css';
import player from './ranger_yellow.png';

export default function MuncherGrid({ game, loadingGame, handleMove, currentPosition }) {

  return (
    <div className={`${styles.muncherGrid}`} style={{ display: 'grid' }}>
      {loadingGame ? <h2>loading...</h2> : game.map((square) => (
        <div key={square.position} 
          className={styles.square} 
          onClick={(e) => handleMove(square)}>
          {square.position === currentPosition ? <img src={player} /> : <span>{square.word}</span>}
        </div>
      ))}
    </div>
  );
};
