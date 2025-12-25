import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, AuthResponse } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getUserProfile: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('daisy-user');
    const token = localStorage.getItem('daisy-token');
    if (saved && token) {
      setUser(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await apiClient.post<AuthResponse>('/users/login', { email, password });
      
      if (result.success && result.data) {
        const userData = { id: result.data.user.id, email: result.data.user.email, name: result.data.user.name };
        setUser(userData);
        localStorage.setItem('daisy-user', JSON.stringify(userData));
        localStorage.setItem('daisy-token', result.data.token);
        return { success: true };
      } else {
        return { success: false, error: result.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const result = await apiClient.post<AuthResponse>('/users/register', { email, password, name });
      
      if (result.success && result.data) {
        const userData = { id: result.data.user.id, email: result.data.user.email, name: result.data.user.name };
        setUser(userData);
        localStorage.setItem('daisy-user', JSON.stringify(userData));
        localStorage.setItem('daisy-token', result.data.token);
        return { success: true };
      } else {
        return { success: false, error: result.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('daisy-user');
    localStorage.removeItem('daisy-token');
  };

  const getUserProfile = async () => {
    try {
      const result = await apiClient.get<AuthResponse>('/users/profile');
      
      if (result.success && result.data) {
        const userData = { id: result.data.user.id, email: result.data.user.email, name: result.data.user.name };
        setUser(userData);
        localStorage.setItem('daisy-user', JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: result.message || 'Failed to get user profile' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, getUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
