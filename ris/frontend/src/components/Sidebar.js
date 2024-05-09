// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">🎁</div>
      <div className="name"><h2>Registration Invoice System</h2></div>
   
      <ul className="menu-list">
        <li><Link to="/">Dashboard</Link></li>
        <li>
          Registration
          <ul>
            <li><Link to="/registrationnew">New</Link></li>
            <li><Link to="/registrationstats">Stats</Link></li>
          </ul>
        </li>
        <li>
          Invoice
          <ul>
            <li><Link to="/invoicenew">New</Link></li>
            <li><Link to="/invoicestats">Stats</Link></li>
          </ul>
        </li>
        <li><Link to="/report">Report</Link></li>
        <li><Link to="/support">Support</Link></li>
       </ul>
    </div>
  );
}

export default Sidebar;
