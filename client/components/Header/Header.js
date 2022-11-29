import { useUser } from '../../context/UserContext.js';
import { logoutUser } from '../../services/UserService.js';
import styles from './Header.css';

export default function Header() {
  const { user, setUser, loading } = useUser();
  console.log('inside header user is: ', user);
  console.log('loading is: ', loading);

  const handleClick = () => {
    location.replace('/auth/sign-in');
  };

  const handleLogOut = async () => {
    await logoutUser();
    setUser(undefined);
  };

  return (
    <div className={styles.header}>
      <h2>Eigo</h2>
      {user === undefined && loading === false ? 
        <button onClick={handleClick}>sign-in</button> :
        <button onClick={handleLogOut}>sign out</button>
      }
    </div>
  );
}
