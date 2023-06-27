import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import LoginPage from './components/users/LoginPage';
import Home from './components/Home';
import ATMPage from './components/ATMPage';
import BankApp from './components/BankApp';
import SignupPage from './components/users/SignupPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUsers(userData);
    setLoggedIn(true);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsers(null);
    setLoggedIn(false);
    navigate('/login');
  };

  const handleSignup = (userData) => {
    setUsers(userData);
    setLoggedIn(true);
    navigate('/login');
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<BankApp loggedIn={loggedIn} handleLogout={handleLogout} />}
        />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage handleSignup={handleSignup} />} />
        <Route path="/atm/:id" element={<ATMPage />} />
        <Route path="/home" element={<Home users={users} />} />
      </Routes>
    </div>
  );
};

export default App;