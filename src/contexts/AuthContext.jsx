import React, { createContext, useContext, useState } from 'react';
import { mockCustomers, mockWorkers } from '../utils/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password, role) => {
    // Mock authentication - in real app, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

    if (role === 'admin' && email === 'ramvijay@gmail.com') {
      setCurrentUser({
        id: 'admin1',
        name: 'Admin User',
        email: 'ramvijay@gmail.com',
        phone: '+1-555-0100',
        role: 'admin',
        createdAt: '2024-01-01T00:00:00Z'
      });
      return true;
    }
    
    const allUsers = [...mockCustomers, ...mockWorkers];
    const user = allUsers.find(u => u.email === email && u.role === role);
    
    if (user) {
      setCurrentUser(user);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = async (userData) => {
    // Mock registration - in real app, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      role: userData.role || 'customer',
      createdAt: new Date().toISOString()
    };
    
    setCurrentUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};