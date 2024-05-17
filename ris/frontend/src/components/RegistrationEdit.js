// RegistrationEdit.js

import React, { useState, useEffect } from 'react';

const RegistrationEdit = ({ match }) => {
  const [registration, setRegistration] = useState({});
  const registrationId = match.params.id;

  useEffect(() => {
    // Fetch registration data from API using registrationId
    fetch(`http://localhost:5001/registrations/${registrationId}`)
      .then(response => response.json())
      .then(data => setRegistration(data))
      .catch(error => console.error('Error fetching registration:', error));
  }, [registrationId]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update registration
    console.log('Updated registration:', registration);
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistration({ ...registration, [name]: value });
  };

  return (
    <div>
      <h2>Edit Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Registration Date:</label>
        <input type="text" name="registrationDate" value={registration.registrationDate || ''} onChange={handleChange} />
        {/* Add other input fields for other registration details */}
        <button type="submit">Update Registration</button>
      </form>
    </div>
  );
};

export default RegistrationEdit;
