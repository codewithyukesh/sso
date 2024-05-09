import React, { useState, useEffect } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user was redirected from the "Sun" website with a valid token
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    const userEmail = urlParams.get('email');
    const role = urlParams.get('role');

    const performAutoLogin = async (token) => {
      try {
        const response = await fetch(`/verifyToken?token=${token}`);
        if (!response.ok) {
          throw new Error('Invalid token');
        }
        // If token verification successful, notify the parent component
        onLoginSuccess();
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'An error occurred during automatic login');
      }
    };

    if (token && name && userEmail && role) {
      // Save user data to local storage
      localStorage.setItem('name', name);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', role);
      localStorage.setItem('token', token);

      // Perform automatic login with the token
      performAutoLogin(token);
    }
  }, [onLoginSuccess]);

  const handleLoginSuccess = async () => {
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'An error occurred');
      }

      const userData = await response.json(); // Assuming server responds with user data including name, email, role, and token
     
      // Save user data to local storage
      localStorage.setItem('name', userData.user.name);
      localStorage.setItem('email', userData.user.email);
      localStorage.setItem('role', userData.user.role);
      localStorage.setItem('token', userData.token);

      // Trigger login success callback
      onLoginSuccess();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLoginSuccess();
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
