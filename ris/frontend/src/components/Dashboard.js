import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
 
function Dashboard() {
  const [registrationCount, setRegistrationCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);

  useEffect(() => {
    // Fetch the count of registrations
    fetch('http://localhost:5001/registrations')
      .then(response => response.json())
      .then(data => setRegistrationCount(data.length))
      .catch(error => console.error('Error fetching registration count:', error));

    // Fetch the count of invoices
    fetch('http://localhost:5001/invoices')
      .then(response => response.json())
      .then(data => setInvoiceCount(data.length))
      .catch(error => console.error('Error fetching invoice count:', error));
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        
        <div className="dashboard-container">
          <h2>Dashboard</h2>
          <div className="card">
            <h3>Registrations</h3>
            <p>{registrationCount}</p>
            <Link to="/registrationstats" className="view-link">View Details</Link>
          </div>
          <div className="card">
            <h3>Invoices</h3>
            <p>{invoiceCount}</p>
            <Link to="/invoicestats" className="view-link">View Details</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
