import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Popup from './Popup';
 
function InvoiceStats() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(10); //   value to adjust the number of invoices per page
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5001/invoices')
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Calculate indexes for pagination
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(indexOfFirstInvoice, indexOfLastInvoice);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Handle delete invoice
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/invoices/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete invoice');
      }

      // Remove the deleted invoice from state
      const updatedInvoices = invoices.filter(invoice => invoice._id !== id);
      setInvoices(updatedInvoices);

      // Show success popup
      setPopupMessage('Invoice deleted successfully');
      setShowPopup(true);
    } catch (error) {
      console.error('Error deleting invoice:', error);
      setPopupMessage('Failed to delete invoice');
      setShowPopup(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="registration-container">
          <h2>Invoice Stats:</h2>
          <Link to="/invoicenew" className="new-registration-btn">
            New Invoice
          </Link>
          <br /> <br />

          <table className="registration-table">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Date</th>
                <th>Letter No</th>
                <th>Receiver's Name</th>
                <th>Address</th>
                <th>Subject</th>
                <th>Means of Sending</th>
                <th>Corresponding Branch</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice, index) => (
                <tr key={invoice._id}>
                  <td>{indexOfFirstInvoice + index + 1}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.letterNo}</td>
                  <td>{invoice.receiversName}</td>
                  <td>{invoice.address}</td>
                  <td>{invoice.subject}</td>
                  <td>{invoice.meansOfSending}</td>
                  <td>{invoice.correspondingBranch}</td>
                  <td>{invoice.remarks}</td>
                  <td>
                    <button onClick={() => handleDelete(invoice._id)} className="delete-registration-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(invoices.length / invoicesPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />

      {showPopup && (
        <Popup message={popupMessage} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default InvoiceStats;
