import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Registrationnew from './components/Registrationnew';
import Registrationstats from './components/Registrationstats';
import Invoicenew from './components/Invoicenew';
import Invoicestats from './components/Invoicestats';
import Support from './components/Support';
import Report from './components/Report';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there's a token in local storage when the component mounts
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/homepage" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/registrationnew" element={<Registrationnew />} />
          <Route path="/registrationstats" element={<Registrationstats />} />
          <Route path="/invoicenew" element={<Invoicenew />} />
          <Route path="/invoicestats" element={<Invoicestats />} />
          <Route path="/report" element={<Report />} />
          <Route path="/support" element={<Support />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
