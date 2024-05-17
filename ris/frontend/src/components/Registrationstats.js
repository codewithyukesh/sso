import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Registrationstats() {
  const [registrations, setRegistrations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationsPerPage] = useState(10); // Change this value to adjust the number of registrations per page

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5001/registrations')
      .then(response => response.json())
      .then(data => setRegistrations(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  // Calculate indexes for pagination
  const indexOfLastRegistration = currentPage * registrationsPerPage;
  const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage;
  const currentRegistrations = registrations.slice(indexOfFirstRegistration, indexOfLastRegistration);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

 
  const handleDelete = (id) => {
    // Filter out the registration with the provided ID
    const updatedRegistrations = registrations.filter(registration => registration.id !== id);
    // Update the state with the filtered registrations
    setRegistrations(updatedRegistrations);
    // Implement logic to send delete request to API
    console.log('Deleting registration with ID:', id);
  }

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="registration-container">
          <h2>Registration Stats:</h2>
          <Link to="/registrationnew" className="new-registration-btn">
            New Registration
          </Link>
          <br /><br />
          
          <table className="registration-table">
            <thead>
              <tr>
                <th>Registration No.</th>
                <th>Registration Date</th>
                <th>Dispatch No</th>
                <th>Ref No</th>
                <th>Letter Date</th>
                <th>Sender's Name</th>
                <th>Sender's Address</th>
                <th>Subject</th>
                <th>Relevant Section</th>
                <th>Remarks</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {currentRegistrations.map((registration, index) => (
                <tr key={registration.id}>
                  <td>{indexOfFirstRegistration + index + 1}</td> {/* Add the registration number */}
                  <td>{registration.registrationDate}</td>
                  <td>{registration.dispatchNo}</td>
                  <td>{registration.refNo}</td>
                  <td>{registration.letterDate}</td>
                  <td>{registration.sendersName}</td>
                  <td>{registration.sendersAddress}</td>
                  <td>{registration.subject}</td>
                  <td>{registration.relevantSection}</td>
                  <td>{registration.remarks}</td>
                  <td>
                    <Link to={`/registrationview/${registration.id}`} className="view-registration-btn">
                      View
                    </Link>
                    <Link to={`/registrationedit/${registration.id}`} className="edit-registration-btn">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(registration.id)} className="delete-registration-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(registrations.length / registrationsPerPage) }).map((_, index) => (
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

export default Registrationstats;
