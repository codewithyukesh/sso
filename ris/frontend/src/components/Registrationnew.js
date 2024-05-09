// RegistrationNew.js
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import React, { useState } from 'react';
 
const RegistrationNew = () => {
  const [formData, setFormData] = useState({
    registrationDate: '',
    dispatchNo: '',
    refNo: '',
    letterDate: '',
    sendersName: '',
    sendersAddress: '',
    subject: '',
    relevantSection: '',
    file: '',
    remarks: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    // Optionally, you can reset the form fields here
  };

  return (
    <div>
    <Header />
    <div className="container">
      <Sidebar />
    <div className="registration-new">
      <h2>New Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for registration data */}
        <div className="form-row">

        <div className="form-group col ">
          <label>Registration Date:</label>
          <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} />
        </div>
        <div className="form-group col">
          <label>Dispatch No:</label>
          <input type="text" name="dispatchNo" value={formData.dispatchNo} onChange={handleChange} />
        </div>
        <div className="form-group col">
          <label>Ref No:</label>
          <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
        </div>
        <div className="form-group col">
          <label>Letter Date:</label>
          <input type="date" name="letterDate" value={formData.letterDate} onChange={handleChange} />
        </div>
        </div>
        <div className="form-row">
        <div className="form-group col">
          <label>Sender's Name:</label>
          <input type="text" name="sendersName" value={formData.sendersName} onChange={handleChange} />
        </div>
        <div className="form-group col">
          <label>Sender's Address:</label>
          <input type="text" name="sendersAddress" value={formData.sendersAddress} onChange={handleChange} />
        </div>
        <div className="form-group col">
          <label>Subject:</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
        </div>
         </div>
        <div className="form-group">
          <label>Relevant Section:</label>
          <input type="text" name="relevantSection" value={formData.relevantSection} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>File:</label>
          <input type="file" name="file" value={formData.file} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Remarks:</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Data has been saved.</p>
            <button onClick={handlePopupClose}>OK</button>
          </div>
        </div>
      )}
    </div>
    </div>
    <Footer />

    </div>
  );
};

export default RegistrationNew;
