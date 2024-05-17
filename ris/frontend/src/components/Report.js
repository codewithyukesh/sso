import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Report() {
  const [reportType, setReportType] = useState('invoices');
  const [reportData, setReportData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    fetchData();
  }, [reportType, currentPage, fromDate, toDate]);

  const fetchData = () => {
    let apiUrl = `http://localhost:5001/${reportType}`;
    if (fromDate && toDate) {
      apiUrl += `?fromDate=${fromDate}&toDate=${toDate}`;
    }
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setReportData(data);
        setTotalCount(data.length);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const toggleReportType = () => {
    setReportType(prevReportType => prevReportType === 'invoices' ? 'registrations' : 'invoices');
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="report-container">
          <h2>{reportType === 'invoices' ? 'Invoice' : 'Registration'} Report:</h2>
          <div className="report-buttons">
            <button onClick={toggleReportType} className={reportType === 'invoices' ? 'active' : ''}>Invoice Report</button>
            <button onClick={toggleReportType} className={reportType === 'registrations' ? 'active' : ''}>Registration Report</button>
          </div>
          <div className="count-cards">
            <div className="count-card">
              <p>Total Invoices: {totalCount}</p>
            </div>
            <div className="count-card">
              <p>Total Registrations: {totalCount}</p>
            </div>
          </div>
          <div className="date-filter">
            <input type="date" value={fromDate} onChange={handleFromDateChange} placeholder="From Date" />
            <input type="date" value={toDate} onChange={handleToDateChange} placeholder="To Date" />
          </div>
          <br /><br />

          <table className="report-table">
            <thead>
              <tr>
                {reportType === 'invoices' ? (
                  <>
                    <th>Invoice No.</th>
                    <th>Date</th>
                    <th>Letter No</th>
                    <th>Receiver's Name</th>
                    <th>Address</th>
                    <th>Subject</th>
                  </>
                ) : (
                  <>
                    <th>Registration No.</th>
                    <th>Registration Date</th>
                    <th>Dispatch No</th>
                    <th>Ref No</th>
                    <th>Letter Date</th>
                    <th>Sender's Name</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{reportType === 'invoices' ? item.date : item.registrationDate}</td>
                  <td>{reportType === 'invoices' ? item.letterNo : item.dispatchNo}</td>
                  <td>{reportType === 'invoices' ? item.receiversName : item.sendersName}</td>
                  <td>{reportType === 'invoices' ? item.address : item.sendersAddress}</td>
                  <td>{item.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(totalCount / itemsPerPage) }).map((_, index) => (
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

export default Report;
