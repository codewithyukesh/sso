import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Popup from './Popup';

function Registrationstats() {
  const [registrations, setRegistrations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [registrationsPerPage] = useState(10);
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/registrations')
      .then(response => response.json())
      .then(data => setRegistrations(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const indexOfLastRegistration = currentPage * registrationsPerPage;
  const indexOfFirstRegistration = indexOfLastRegistration - registrationsPerPage;
  const currentRegistrations = registrations.slice(indexOfFirstRegistration, indexOfLastRegistration);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5001/registrations/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration');
      }

      const updatedRegistrations = registrations.filter(registration => registration._id !== _id);
      setRegistrations(updatedRegistrations);
      setPopupMessage('Registration data has deleted successfully');
    } catch (error) {
      console.error('Error deleting registration data:', error);
      setPopupMessage('Failed to delete registration data');
    }
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

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
                <th>Actions</th>  
              </tr>
            </thead>
            <tbody>
              {currentRegistrations.map((registration, index) => (
                <tr key={registration._id}>
                  <td>{indexOfFirstRegistration + index + 1}</td>  
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
                    <button onClick={() => handleDelete(registration._id)} className="delete-registration-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
}

export default Registrationstats;
