// HomePage.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Registrationnew from './Registrationnew';
import Invoicenew from './Invoicenew';
import Report from './Report';
import Support from './Support';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/registrationnew" element={<Registrationnew />} />
          <Route path="/invoicenew" element={<Invoicenew />} />
          <Route path="/report" element={<Report />} />
          <Route path="/Support" element={<Support />} />
          {/* Add more routes for other pages */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
