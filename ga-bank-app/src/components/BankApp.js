import React from 'react';
import { Link } from 'react-router-dom';

const BankApp = ({ loggedIn, handleLogout }) => {
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
    </div>
  );
};

export default BankApp;