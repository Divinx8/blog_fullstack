import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (username, password) => {
    const res = await axios.post('https://blog-fullstack-eiwm.onrender.com/api/token/',  { 
      username, 
      password 
    }, {
      headers: { 'Content-Type': 'application/json' }
    });
    localStorage.setItem('token', res.data.access);
    localStorage.setItem('user', JSON.stringify({ username }));
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);