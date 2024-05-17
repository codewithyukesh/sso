import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Dashboard() {
  const [invoiceData, setInvoiceData] = useState([]);
  const [registrationData, setRegistrationData] = useState([]);

  useEffect(() => {
    // Fetch invoice data
    fetch('http://localhost:5001/invoices')
      .then(response => response.json())
      .then(data => setInvoiceData(data))
      .catch(error => console.error('Error fetching invoices:', error));

    // Fetch registration data
    fetch('http://localhost:5001/registrations')
      .then(response => response.json())
      .then(data => setRegistrationData(data))
      .catch(error => console.error('Error fetching registrations:', error));
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="dashboard-container">
          <h2>Dashboard</h2>
          <div className="dashboard-summary">
            <div className="summary-card">
              <h3>Total Invoices</h3>
              <p>{invoiceData.length}</p>
              <Link to="/invoicestats" className="view-details-btn">View Details</Link>
            </div>
            <div className="summary-card">
              <h3>Total Registrations</h3>
              <p>{registrationData.length}</p>
              <Link to="/registrationstats" className="view-details-btn">View Details</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
