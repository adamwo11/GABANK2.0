
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import LoginPage from './users/LoginPage';
import SignupPage from './users/SignupPage';

class BankApp extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1>GA BANK</h1>
          <nav>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </nav>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default BankApp;