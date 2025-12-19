import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('daisy-user');
    if (saved) setUser(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('daisy-users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    
    if (found) {
      const userData = { id: found.id, email: found.email, name: found.name };
      setUser(userData);
      localStorage.setItem('daisy-user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (email: string, password: string, name: string) => {
    const users = JSON.parse(localStorage.getItem('daisy-users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = { id: crypto.randomUUID(), email, password, name };
    users.push(newUser);
    localStorage.setItem('daisy-users', JSON.stringify(users));

    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userData);
    localStorage.setItem('daisy-user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('daisy-user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
