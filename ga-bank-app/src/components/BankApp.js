import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import LoginPage from './users/LoginPage';
import SignupPage from './users/SignupPage';
import Home from './Home';

const BankApp = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(null);

  const handleLogin = (userData) => {
    setUsers(userData);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUsers(null);
    setLoggedIn(false);
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
        <Route
          path="/"
          element={loggedIn ? <Home users={users} /> : <LoginPage handleLogin={handleLogin} />}
        />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default BankApp;
