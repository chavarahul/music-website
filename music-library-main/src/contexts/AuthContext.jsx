import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [currentUser, setCurrentUser] = useState(null);

  const ADMIN_USERNAME = 'Admin';
  const ADMIN_PASSWORD = 'Admin@123';
  const DEFAULT_USER = { username: 'Test', password: 'Test@123' };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[DEFAULT_USER.username]) {
      users[DEFAULT_USER.username] = { password: DEFAULT_USER.password };
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        const isTokenExpired = decoded.exp < Math.floor(Date.now() / 1000);

        if (isTokenExpired) {
          logout();
        } else {
          setCurrentUser(decoded);
          localStorage.setItem('token', token);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    } else {
      localStorage.removeItem('token');
      setCurrentUser(null);
    }
  }, [token]);

  const login = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const payload = {
        username,
        role: 'admin',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      };
      const newToken = btoa(JSON.stringify(payload));
      setToken(newToken);
      return true;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const user = users[username];

    if (user && user.password === password) {
      const payload = {
        username,
        role: 'user',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
      };
      const newToken = btoa(JSON.stringify(payload));
      setToken(newToken);
      return true;
    }

    return false;
  };

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[username]) return false;

    users[username] = { password };
    localStorage.setItem('users', JSON.stringify(users));
    return login(username, password);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, signup, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
