import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const [shouldRedirect, setShouldRedirect] = useState(false); // Flag for redirecting

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3002/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Set the user data in state
        setShouldRedirect(true); // Set the flag to redirect
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    // Input validation
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful');
        const { id, name, email } = data.user;
        const userData = { id, name, email };
  
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
  
        handleLogin(userData);
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again later.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Redirect when the flag is set to true
    if (shouldRedirect) {
      navigate('/', { state: { user } });
    }
  }, [shouldRedirect, navigate, user]);

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
