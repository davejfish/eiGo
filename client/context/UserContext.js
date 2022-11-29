import { createContext, useContext, useState, useEffect } from 'react';
import { getUser } from '../services/UserService.js';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchUser();

  }, []);
  
  return <UserContext.Provider value ={{ user, setUser, loading, setLoading }}>
    {children}
  </UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
};
