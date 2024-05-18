import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Report() {
  const [reportType, setReportType] = useState('registrations');
  const [reportData, setReportData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, [reportType, currentPage]);

  const fetchData = () => {
    let apiUrl = `http://localhost:5001/${reportType}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setReportData(data);
        setTotalCount(data.length);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleReportTypeChange = (type) => {
    setReportType(type);
    setCurrentPage(1); // Reset current page when changing report type
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reportData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <Header />
      <div className="report-container">
        <Sidebar />
        <h2> {reportType === 'registrations' ? 'Registrations' : 'Invoices'} Report</h2>
        <div className="report-buttons">
          <button onClick={() => handleReportTypeChange('registrations')} className={reportType === 'registrations' ? 'active' : ''}>Registration Report</button>
          <button onClick={() => handleReportTypeChange('invoices')} className={reportType === 'invoices' ? 'active' : ''}>Invoice Report</button>
        </div>
        <p>Total {reportType === 'registrations' ? 'Registrations' : 'Invoices'}: {totalCount}</p>
        <table className="report-table">
          <thead>
            <tr>
              {reportType === 'registrations' ? (
                <>
                  <th>Registration No.</th>
                  <th>Registration Date</th>
                  <th>Dispatch No</th>
                  <th>Ref No</th>
                  <th>Letter Date</th>
                  <th>Sender's Name</th>
                  <th>Sender's Address</th>
                  <th>Subject</th>
                  <th>Relevant Section</th>
                </>
              ) : (
                <>
                  <th>Invoice No.</th>
                  <th>Date</th>
                  <th>Letter No</th>
                  <th>Receiver's Name</th>
                  <th>Address</th>
                  <th>Subject</th>
                  <th>Means of Sending</th>
                  <th>Corresponding Branch</th>
                </>
              )}
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getPageData().map((item, index) => (
              <tr key={index}>
                {reportType === 'registrations' ? (
                  <>
                    <td>{index + 1}</td>
                    <td>{item.registrationDate}</td>
                    <td>{item.dispatchNo}</td>
                    <td>{item.refNo}</td>
                    <td>{item.letterDate}</td>
                    <td>{item.sendersName}</td>
                    <td>{item.sendersAddress}</td>
                    <td>{item.subject}</td>
                    <td>{item.relevantSection}</td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.letterNo}</td>
                    <td>{item.receiversName}</td>
                    <td>{item.address}</td>
                    <td>{item.subject}</td>
                    <td>{item.meansOfSending}</td>
                    <td>{item.correspondingBranch}</td>
                  </>
                )}
                <td>{item.remarks}</td>
                <td>
                  <button className="delete-registration-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>{index + 1}</button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Report;
