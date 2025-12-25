import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getAdminProfile: () => Promise<{ success: boolean; error?: string }>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('admin-user');
    const token = localStorage.getItem('admin-token');
    if (saved && token) {
      setAdmin(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const adminData = { 
          id: data.user.id, 
          email: data.user.email, 
          name: data.user.name,
          role: data.user.role 
        };
        setAdmin(adminData);
        localStorage.setItem('admin-user', JSON.stringify(adminData));
        localStorage.setItem('admin-token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Admin login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin-user');
    localStorage.removeItem('admin-token');
  };

  const getAdminProfile = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      if (!token) {
        return { success: false, error: 'No admin token found' };
      }

      const response = await fetch(`${API_URL}/admin/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        const adminData = { 
          id: data._id, 
          email: data.email, 
          name: data.name,
          role: data.role 
        };
        setAdmin(adminData);
        localStorage.setItem('admin-user', JSON.stringify(adminData));
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Failed to get admin profile' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, isLoading, login, logout, getAdminProfile }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};