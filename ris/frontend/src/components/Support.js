import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar'; 
 
function Support() {
  return (
    <div>
      <Header />
      <div className="support-container">
        <Sidebar />
        <div className="support-content">
          <h1>Support Stats Page</h1>
          <p>Welcome to our support stats page. Here you can find various statistics and information regarding our support services.</p>
          <div className="support-stats">
            <div className="support-stat">
              <h2>Total Tickets</h2>
              <p>1000</p>
            </div>
            <div className="support-stat">
              <h2>Resolved Tickets</h2>
              <p>800</p>
            </div>
            <div className="support-stat">
              <h2>Open Tickets</h2>
              <p>200</p>
            </div>
          </div>
          <div className="support-info">
            <p>For further assistance, please contact our support team at <b>codewithyukesh@gmail.com</b> or call us at <b>+977 9848906528</b></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Support;
