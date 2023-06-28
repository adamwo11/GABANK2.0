import React from 'react';
import { Link } from 'react-router-dom';
import './css/BankApp.css';

const BankApp = ({ loggedIn, handleLogout }) => {
  return (
    <div className="bankapp-container">
      <h1 className="bankapp-heading">GA BANK</h1>
      <nav>
        {loggedIn ? (
          <button className="bankapp-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <div className="bankapp-buttons">
            <Link to="/login" className="bankapp-link">
              <button className="bankapp-button bankapp-button-login">Login</button>
            </Link>
            <Link to="/signup" className="bankapp-link">
              <button className="bankapp-button bankapp-button-signup">Signup</button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default BankApp;
