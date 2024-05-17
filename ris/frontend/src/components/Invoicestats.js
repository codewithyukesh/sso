import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function InvoiceStats() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(10); // Change this value to adjust the number of invoices per page

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
const handleInvoice = (id) => {
   
  }
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="registration-container"> {/* Add class name here */}
          <h2>Invoice Stats:</h2>
          <Link to="/invoicenew" className="new-registration-btn"> {/* Use Link here */}
            New Invoice
          </Link>
          <br /> <br />

          <table className="registration-table"> {/* Add class name here */}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice, index) => (
                <tr key={invoice.id}>
                  <td>{indexOfFirstInvoice + index + 1}</td> {/* Add the invoice number */}
                  <td>{invoice.date}</td>
                  <td>{invoice.letterNo}</td>
                  <td>{invoice.receiversName}</td>
                  <td>{invoice.address}</td>
                  <td>{invoice.subject}</td>
                  <td>{invoice.meansOfSending}</td>
                  <td>{invoice.correspondingBranch}</td>
                  <td>
                  <Link to={`/invoiceview/${invoice.id}`} className="view-registration-btn">
                      View
                    </Link>
                    <Link to={`/invoiceedit/${invoice.id}`} className="edit-registration-btn">
                      Edit
                    </Link>
                    <button onClick={() => handleInvoice(invoice.id)} className="delete-registration-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination"> {/* Add class name here */}
            {Array.from({ length: Math.ceil(invoices.length / invoicesPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InvoiceStats;
