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
    file: null,
    remarks: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '' // Clear error message for the field being edited
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    const requiredFields = [
      'registrationDate', 'dispatchNo', 'refNo', 'letterDate', 
      'sendersName', 'sendersAddress', 'subject', 'relevantSection'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required and cannot be just spaces';
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // File validation
    if (formData.file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(formData.file.type)) {
        setErrors(prevErrors => ({ ...prevErrors, file: 'Only PDF, JPEG, and PNG files are allowed.' }));
        return;
      }

      if (formData.file.size > maxSize) {
        setErrors(prevErrors => ({ ...prevErrors, file: 'File size should not exceed 5MB.' }));
        return;
      }
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5001/registrations', {
        method: 'POST',
        body: formDataToSend,
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
    setFormData({
      registrationDate: '',
      dispatchNo: '',
      refNo: '',
      letterDate: '',
      sendersName: '',
      sendersAddress: '',
      subject: '',
      relevantSection: '',
      file: null,
      remarks: ''
    });
    setErrors({});
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
              <div className="form-group col">
                <label>Registration Date:</label>
                <input type="date" name="registrationDate" value={formData.registrationDate} onChange={handleChange} />
                {errors.registrationDate && <span className="error">{errors.registrationDate}</span>}
              </div>
              <div className="form-group col">
                <label>Dispatch No:</label>
                <input type="text" name="dispatchNo" value={formData.dispatchNo} onChange={handleChange} />
                {errors.dispatchNo && <span className="error">{errors.dispatchNo}</span>}
              </div>
              <div className="form-group col">
                <label>Ref No:</label>
                <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} />
                {errors.refNo && <span className="error">{errors.refNo}</span>}
              </div>
              <div className="form-group col">
                <label>Letter Date:</label>
                <input type="date" name="letterDate" value={formData.letterDate} onChange={handleChange} />
                {errors.letterDate && <span className="error">{errors.letterDate}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Sender's Name:</label>
                <input type="text" name="sendersName" value={formData.sendersName} onChange={handleChange} />
                {errors.sendersName && <span className="error">{errors.sendersName}</span>}
              </div>
              <div className="form-group col">
                <label>Sender's Address:</label>
                <input type="text" name="sendersAddress" value={formData.sendersAddress} onChange={handleChange} />
                {errors.sendersAddress && <span className="error">{errors.sendersAddress}</span>}
              </div>
              <div className="form-group col">
                <label>Subject:</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                {errors.subject && <span className="error">{errors.subject}</span>}
              </div>
            </div>
            <div className="form-row">

            <div className="form-group col">
              <label>Relevant Section:</label>
              <input type="text" name="relevantSection" value={formData.relevantSection} onChange={handleChange} />
              {errors.relevantSection && <span className="error">{errors.relevantSection}</span>}
            </div>
            <div className="form-group col">
              <label>File:</label>
              <input type="file" name="file" onChange={handleChange} />
              {errors.file && <span className="error">{errors.file}</span>}
            </div>
            </div>
            <div className="form-group">
              <label>Remarks:</label>
              <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
            </div>
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
