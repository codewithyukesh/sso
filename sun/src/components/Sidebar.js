import React from 'react';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">🎁</div>
      <div className="name"><h1>SUN</h1></div>
      <ul className="menu-list">
        <li>My Profile</li>
        <li>Departments</li>
        <li>Change Password</li>
        <li>Support</li>
      </ul>
    </div>
  );
}

export default Sidebar;
