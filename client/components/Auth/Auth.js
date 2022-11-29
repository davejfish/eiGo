import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { signIn, signUp } from '../../services/UserService.js';
import styles from './Auth.css';

export default function Auth() {
  const { method } = useParams();
  const { user, setUser } = useUser();

  if (user) {
    location.replace('/'); 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userInfo = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    method === 'sign-in' ? setUser(await signIn(userInfo)) : setUser(await signUp(userInfo));
  };

  return (
    <div>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <label htmlFor='email'>email: </label>
        <input required placeholder='abc@gmail.com' name='email' />
        <label htmlFor='password'>password: </label>
        <input required placeholder='password' type='password' name='password' />
        <button name='submit'>{method}</button>
        {method === 'sign-up' ? <a href='/auth/sign-in'><span>Already have an account? Sign in!</span></a> : 
          <a href='/auth/sign-up'><span>Don't have an account? Sign up!</span></a>
        }
        
      </form>
    </div>
  );
}
