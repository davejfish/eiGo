import { useUser } from '../../context/UserContext.js';
import useWords from '../../hooks/useWords.js';
import { enforceUser } from '../../services/UserService.js';
import { doublePhonics, singlePhonics } from '../../utils/wordUtils.js';
import styles from './Landing.css';

export default function Landing({ 
  targetSound, 
  setTargetSound, 
  setTargetGroup,
  difficulty, 
  setDifficulty 
}) {
  const { user, loading } = useUser();
  enforceUser(user, loading);

  const getRandomPhonics = (arr) => {
    arr = arr.split(' ');
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setTargetGroup(formData.get('phonics'));
    const target = getRandomPhonics(formData.get('phonics'));
    setDifficulty(formData.get('difficulty'));
    setTargetSound(target);
  };
  
  return (
    <div className={styles.landing}>
      <div className={`box ${styles.landingContainer}`}>
        <h2 className={'title'}>Select your phonics...</h2>
        <form className={`${styles.LandingForm} box`} onSubmit={(e) => handleSubmit(e)}>
          <label className={'label is-size-3'}>difficulty</label>
          <div className={`select is-rounded ${styles.foo}`}> 
            <select required onChange={(e) => setDifficulty(e.target.value)} name={'difficulty'}>
              <option value={null}>-</option>
              <option value='E1'>3 letter words</option>
              <option value='E2'>4-5 letter words</option>
            </select>
          </div>
          <label className={'label is-size-3'}>phonics</label>
          <div className={`select is-rounded ${styles.foo}`}>
            <select required name='phonics'>
              <option value={null}>-</option>
              {difficulty === 'E1' ? singlePhonics.map(phonics => (
                <option key={phonics} value={phonics}>{phonics}</option>
              )) : 
                doublePhonics.map(phonics => (
                  <option key={phonics} value={phonics}>{phonics}</option>
                ))};
            </select>
          </div>
          <button className={'button'}>Let's Go!</button>
        </form>
      </div>
    </div>
  );
}
