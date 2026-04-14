import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup';
import UserDashboard from './Components/User/user_dashboard';
import AdminDashboard from './Components/Admin/admin_dashboard';
import { ThemeProvider, useTheme } from './utils/ThemeContext';

function AppContent() {
  const [showSignup, setShowSignup] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { theme } = useTheme();

  // If user is logged in, show dashboard
  if (currentUser) {
    if (currentUser.isAdmin) {
      return (
        <AdminDashboard
          admin={currentUser}
          setShowAdmin={setShowAdmin}
          setCurrentUser={setCurrentUser}
        />
      );
    } else {
      return (
        <UserDashboard
          user={currentUser}
          setShowSignup={setShowSignup}
          setCurrentUser={setCurrentUser}
        />
      );
    }
  }

  // If admin login is clicked
  if (showAdmin) {
    return (
      <Login
        setShowSignup={setShowSignup}
        setShowAdmin={setShowAdmin}
        setCurrentUser={setCurrentUser}
        isAdminLogin={true}
      />
    );
  }

  // If signup is clicked
  if (showSignup) {
    return (
      <Signup
        setShowSignup={setShowSignup}
        setCurrentUser={setCurrentUser}
      />
    );
  }

  // Default: Login screen
  return (
    <>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Login
        setShowSignup={setShowSignup}
        setShowAdmin={setShowAdmin}
        setCurrentUser={setCurrentUser}
        isAdminLogin={false}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
