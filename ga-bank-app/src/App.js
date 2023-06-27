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
      <h1>GA BANK</h1>
      <nav>
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<BankApp users={users} handleLogin={handleLogin} />} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage handleSignup={handleSignup} />} />
        <Route path="/atm/:id" element={<ATMPage />} />
        <Route path="/home" element={<Home users={users} />} />
      </Routes>
    </div>
  );
};

export default App;