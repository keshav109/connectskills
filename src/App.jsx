import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import DashboardLayout from './components/Dashboard/DashboardLayout';

const AppContent = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginForm />;
  }

  return <DashboardLayout />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;