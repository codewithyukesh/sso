import React, { useState } from 'react';

const Login = ({ onSignupClick, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Email:', email);
      console.log('Password:', password);
      
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        // Handle server errors
        const data = await response.json();
        throw new Error(data.message);
      }
      
      // Extract user data and token from the response
      const responseData = await response.json();
      const { message, token, user } = responseData;

      if (!user || !user.name || !user.email || !user.role) {
        throw new Error('User data incomplete');
      }

      // Store user details and token in local storage
      localStorage.setItem('name', user.name);
      localStorage.setItem('role', user.role);
      localStorage.setItem('email', user.email);
      localStorage.setItem('token', token);

      // Clear form fields on successful login
      setEmail('');
      setPassword('');
      
      // Handle successful login
      onLoginSuccess();
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    }
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
      <p>Don't have an account? <button onClick={onSignupClick}>Signup</button></p>
    </div>
  );
};

export default Login;
