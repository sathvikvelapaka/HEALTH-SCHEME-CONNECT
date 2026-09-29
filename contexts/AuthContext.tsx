
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout, getCurrentUser, loginAsGuest as apiLoginAsGuest } from '../services/authService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const user = await apiLogin(email, password);
    setUser(user);
  };

  const signup = async (name, email, password) => {
    const user = await apiSignup(name, email, password);
    setUser(user);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  const loginAsGuest = async () => {
    const user = await apiLoginAsGuest();
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, loginAsGuest, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
