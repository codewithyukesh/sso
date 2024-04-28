import React from 'react';
 
function Header() {
 
  // Retrieve name and post from local storage
  const name = localStorage.getItem('name');
  const post = localStorage.getItem('role');

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Redirect to login page
    window.location.href = '/login';

   };

  return (
    <div className="header">
      <div className="left">Fiscal Year : 2080/081</div>
      <div className="right">
        <span>{name}</span>
        <span>|</span>
        <span>{post}</span>
        <span>|</span>
        <span className="logout" onClick={handleLogout}>Logout</span>
      </div>
    </div> 
  );
}

export default Header;
