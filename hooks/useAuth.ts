import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/mockApi';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  loginWithName: (name: string, password: string) => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged-in user in localStorage on initial load
    const checkUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const foundUser = await api.getUserByEmail(email);
      if (foundUser && foundUser.password === password) {
        const { password: _, ...userToStore } = foundUser;
        setUser(userToStore);
        localStorage.setItem('user', JSON.stringify(userToStore));
        return { success: true, user: userToStore };
      }
      return { success: false, message: 'Invalid email or password.' };
    } catch (error) {
      return { success: false, message: 'An error occurred.' };
    } finally {
      setLoading(false);
    }
  };

  const loginWithName = async (name: string, password: string) => {
    setLoading(true);
    try {
      const foundUser = await api.findUserByName(name);
      if (foundUser && foundUser.password === password) {
        const { password: _, ...userToStore } = foundUser;
        setUser(userToStore);
        localStorage.setItem('user', JSON.stringify(userToStore));
        return { success: true, user: userToStore };
      }
      return { success: false, message: 'Invalid name or password.' };
    } catch (error) {
      return { success: false, message: 'An error occurred.' };
    } finally {
      setLoading(false);
    }
  };
  
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
        const existingUser = await api.getUserByEmail(email);
        if (existingUser) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        await api.addUser({ name, email, password, role: 'user' });
        return { success: true };
    } catch (error) {
        return { success: false, message: 'An error occurred during signup.' };
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  const isAdmin = user?.role === 'admin';

  const value = { user, isAdmin, loading, login, loginWithName, logout, signup };

  // FIX: Replaced JSX with React.createElement to avoid syntax errors in a .ts file
  return React.createElement(AuthContext.Provider, { value }, !loading && children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};