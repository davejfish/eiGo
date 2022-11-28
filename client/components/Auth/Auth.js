import { useParams } from 'react-router-dom';
import { signIn, signUp } from '../../services/UserService.js';
import './Auth.css';

export default function Auth() {
  const { method } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userInfo = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    method === 'sign-in' ? signIn(userInfo) : signUp(userInfo);
  };

  return (
    <div className='auth-form'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>email: </label>
        <input required placeholder='abc@gmail.com' name='email' />
        <label htmlFor='password'>password: </label>
        <input required placeholder='password' type='password' name='password' />
        <button name='submit'>{method}</button>
      </form>
    </div>
  );
}
