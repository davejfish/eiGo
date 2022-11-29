import { useUser } from '../../context/UserContext.js';
import './Landing.css';

export default function Landing() {
  const { user, loading } = useUser();
  if (user === undefined && loading === false) {
    location.replace('/auth/sign-in');
  }
  
  return (
    <div>Here is your landing page</div>
  );
}
