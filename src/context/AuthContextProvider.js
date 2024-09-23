import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'));
  
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setLoggedIn(token);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Initial check

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isGuest = () => {
    return loggedIn === 'guest'
  }

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
