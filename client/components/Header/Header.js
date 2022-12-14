import { useUser } from '../../context/UserContext.js';
import { logoutUser } from '../../services/UserService.js';
import Tutorial from '../Tutorial/Tutorial.js';
import styles from './Header.css';

export default function Header() {
  const { user, setUser, loading } = useUser();

  const handleClick = () => {
    location.replace('/auth/sign-in');
  };

  const handleLogOut = async () => {
    await logoutUser();
    setUser(undefined);
  };

  return (
    <div className={`${styles.EiGoHeader}`}>
      <h2 className={'is-size-3'}>EiGo</h2>
      <div className={styles.headerFlex}>
        {user === undefined && loading === false ? 
          <button className={`button is-small is-rounded is-info ${loading ? 'is-loading' : ''}`} onClick={handleClick}>sign-in</button> :
          <button className={`button is-small is-rounded is-info ${loading ? 'is-loading' : ''}`} onClick={handleLogOut}>sign out</button>
        }
        <Tutorial />
      </div>
    </div>
  );
}
