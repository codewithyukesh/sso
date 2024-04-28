// App.js
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
      setLoggedIn(true);
  };

  return (
      <div className="App">
          {!loggedIn ? (
              <Login onLoginSuccess={handleLoginSuccess} />
          ) : (
              <HomePage />
          )}
      </div>
  );
}

export default App;