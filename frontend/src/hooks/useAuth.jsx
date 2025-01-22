import { useContext, useEffect } from 'react';
import axios from '../config/axios';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const storedUser = getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return { user, login, logout, isAuthenticated };
};