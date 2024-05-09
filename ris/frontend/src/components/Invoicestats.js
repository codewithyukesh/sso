import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar'; 

function Invoicestats() {
  return (
    <div>
    <Header />
    <div className="container">
      <Sidebar />
     <div className="registration-new"><h1>Invoice Stats</h1></div>
    </div>
    <Footer />

    </div>
  );
}

export default Invoicestats;
