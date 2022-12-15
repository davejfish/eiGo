import styles from './Tutorial.css';
import { useState } from 'react';

export default function Tutorial() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(prev => !prev);
  };

  return (
    <>
      <div className={styles.tutorial}>
        <button onClick={handleClick} className={'button is-rounded is-info'}>?</button>
      </div>
      {active && 
      <div className={`modal ${styles.tutorialModal} box ${active && 'is-active'}`}>
        <h2 className={'is-size-2'}>遊び方</h2>
        <div className={'message is-info'}>
          <div className={'message-header'}>
            <h3 className={'is-size-4'}>EiGoへようこそ。</h3>
          </div>
          <p className={'message-body'}>
            EiGoは英語のフォニックスを勉強すためのアプリです。最初に単語の長さとターゲットを選びます。
            「Let's Go」のボタンを押してするとゲームが始まります。狙ってるフォニックスは上に表示されています。
            その下の単語の中にターゲットのフォニックス探します。見つけたらその単語の方に動いてタッチします。
            プレイヤーの位置はイエローレンジャーでさし締めます。正解の場合は200ポイント足して一方で、
            間違ったら200ポイントマイナス。三回間違ったらゲームおーばです。
          </p>
        </div>
        <div className={'message is-info'}>

          <div className={'message-header'}>
            <h3 className={'is-size-4'}>
              動き方
            </h3>
          </div>
          <p>
            動きは二つの方法があります。一番目はプレイヤーのとなりの箱をクリックかタッチしたらそこへ動きます。
            二番目は声で動けます。コマンドは6つがあります。
          </p>
          <ul>
            <li>
              <h2 className={'is-size-5'}>「move up」</h2>
              <span>上の方に動きます。</span>
            </li>
            <li>
              <h2 className={'is-size-5'}>「move down」</h2>
              <span>下の方に動きます。</span>
            </li>
            <li>
              <h2 className={'is-size-5'}>「move left」</h2>
              <span>左の方に動きます。</span>
            </li>
            <li>
              <h2 className={'is-size-5'}>「move right」</h2>
              <span>右のほうに動きます。</span>
            </li>
            <li>
              <h2 className={'is-size-5'}>「eat (word)」</h2>
              <span>プレイヤーの位置をセレクトします。</span>
            </li>
            <li>
              <h2 className={'is-size-5'}>「clear text」</h2>
              <span>コマンドのテキストを消します。</span>
            </li>
          </ul>
        </div>
        <h2 className={'is-size-3'}>
          では、頑張ってね！
        </h2>
      </div>
      }
    </>
  );
}
