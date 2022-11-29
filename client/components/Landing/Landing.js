import { useUser } from '../../context/UserContext.js';
import { enforceUser } from '../../services/UserService.js';
import './Landing.css';

export default function Landing() {
  const { user, loading } = useUser();
  enforceUser(user, loading);
  
  return (
    <div>
      <h2>let's EiGo!</h2>
      <div>
        <ul>
          <li>
            <a href='/games/muncher'><span>word muncher game</span></a>
          </li>
        </ul>
      </div>
    </div>
  );
}
