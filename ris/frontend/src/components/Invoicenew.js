import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function InvoiceNew() {
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [nextInvoiceNo, setNextInvoiceNo] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchInvoiceCount = async () => {
    try {
      const response = await fetch('http://localhost:5001/invoices');
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const invoices = await response.json();
      setInvoiceCount(invoices.length);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoiceCount();
  }, []);

  useEffect(() => {
    setNextInvoiceNo(invoiceCount + 1);
  }, [invoiceCount]);

  const [formData, setFormData] = useState({
    date: '',
    letterNo: '',
    receiversName: '',
    address: '',
    subject: '',
    meansOfSending: '',
    correspondingBranch: '',
    attachment: null,
    remarks: ''
  });

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
      'date', 'letterNo', 'receiversName', 'address', 
      'subject', 'meansOfSending', 'correspondingBranch'
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

    // Prepare form data
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:5001/invoices', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to save invoice');
      }

      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const handlePopupClose = async () => {
    setShowPopup(false);
    setFormData({
      date: '',
      letterNo: '',
      receiversName: '',
      address: '',
      subject: '',
      meansOfSending: '',
      correspondingBranch: '',
      attachment: null,
      remarks: ''
    });
    setErrors({});

    // Fetch the updated invoice count
    await fetchInvoiceCount();
    setNextInvoiceNo(invoiceCount + 1);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="registration-new">
          <h2>New Invoice</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col">
                <label>Invoice No:</label>
                <p>{nextInvoiceNo}</p>
              </div>
              <div className="form-group col">
                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
                {errors.date && <span className="error">{errors.date}</span>}
              </div>
              <div className="form-group col">
                <label>Letter No:</label>
                <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
                {errors.letterNo && <span className="error">{errors.letterNo}</span>}
              </div>
              <div className="form-group col">
                <label>Receiver's Name:</label>
                <input type="text" name="receiversName" value={formData.receiversName} onChange={handleChange} />
                {errors.receiversName && <span className="error">{errors.receiversName}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Address:</label>
                <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
                {errors.address && <span className="error">{errors.address}</span>}
              </div>
              <div className="form-group col">
                <label>Subject:</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                {errors.subject && <span className="error">{errors.subject}</span>}
              </div>
              <div className="form-group col">
                <label>Means of Sending:</label>
                <select name="meansOfSending" value={formData.meansOfSending} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="hardcopy">Hardcopy</option>
                  <option value="email">Email</option>
                  <option value="post office">Post Office</option>
                </select>
                {errors.meansOfSending && <span className="error">{errors.meansOfSending}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Corresponding Branch:</label>
                <input type="text" name="correspondingBranch" value={formData.correspondingBranch} onChange={handleChange} />
                {errors.correspondingBranch && <span className="error">{errors.correspondingBranch}</span>}
              </div>
              <div className="form-group col">
                <label>Add Attachment:</label>
                <input type="file" name="attachment" onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>Remarks:</label>
              <textarea name="remarks" value={formData.remarks} onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="submit-btn">Save</button>
          </form>
          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <p>Invoice has been saved.</p>
                <button onClick={handlePopupClose}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default InvoiceNew;
