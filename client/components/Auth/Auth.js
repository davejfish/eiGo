import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { signIn, signUp } from '../../services/UserService.js';
import styles from './Auth.css';

export default function Auth() {
  const { method } = useParams();
  const { user, setUser } = useUser();

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
    <> 
      {user && <Navigate to='/' />}
      <div className={'block'}>
        <form className={`${styles.authForm} box`} onSubmit={handleSubmit}>
          <div className={'field'}>
            <label className={'label'} htmlFor='email'>email: </label>
            <input required placeholder='abc@gmail.com' name='email' />
          </div>
          <div className={'field'}>
            <label className={'label'} htmlFor='password'>password: </label>
            <input required placeholder='password' type='password' name='password' />
          </div>
          <button className={'button is-small is-rounded is-warning'} name='submit'>{method}</button>
          {method === 'sign-up' ? <a href='/auth/sign-in'><span>Already have an account? Sign in!</span></a> : 
            <a href='/auth/sign-up'><span>Don't have an account? Sign up!</span></a>
          }
        
        </form>
      </div>
    </>
  );
}
