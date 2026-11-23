import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout, getCurrentUser, loginAsGuest as apiLoginAsGuest } from '../services/authService';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const user = await apiLogin(email, password);
    setUser(user);
  };

  const signup = async (name: string, email: string, password: string) => {
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
