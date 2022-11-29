import { useUser } from '../../context/UserContext.js';
import { enforceUser } from '../../services/UserService.js';
import styles from './Muncher.css';

export default function Muncher() {
  const { user, loading } = useUser();
  enforceUser(user, loading);

  return (
    <div>Muncher</div>
  );
}
