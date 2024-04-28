import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import MainContent from './components/MainContent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    // Check if there is a valid token in the local storage
    const token = localStorage.getItem('token');
    const tokenExpiration = getTokenExpiration(token);

    if (token && tokenExpiration > Date.now() / 1000) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const getTokenExpiration = (token) => {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.exp;
    } catch (error) {
      return 0;
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleSignupSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleSignupClick = () => {
    setIsSignup(true);
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <Header />
          <Sidebar />
          <MainContent />
          <Footer />
        </>
      ) : (
        <>
          {isSignup ? (
            <Signup onSignupSuccess={handleSignupSuccess} />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} onSignupClick={handleSignupClick} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
