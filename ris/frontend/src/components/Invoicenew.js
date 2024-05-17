import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function InvoiceNew() {
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [nextInvoiceNo, setNextInvoiceNo] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
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
    attachment: '',
    remarks: ''
  });

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
      const response = await fetch('http://localhost:5001/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
              </div>
              <div className="form-group col">
                <label>Letter No:</label>
                <input type="text" name="letterNo" value={formData.letterNo} onChange={handleChange} />
              </div>
              <div className="form-group col">
                <label>Receiver's Name:</label>
                <input type="text" name="receiversName" value={formData.receiversName} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Address:</label>
                <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
              </div>
              <div className="form-group col">
                <label>Subject:</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
              </div>
              <div className="form-group col">
                <label>Means of Sending:</label>
                <select name="meansOfSending" value={formData.meansOfSending} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="hardcopy">Hardcopy</option>
                  <option value="email">Email</option>
                  <option value="post office">Post Office</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label>Corresponding Branch:</label>
                <input type="text" name="correspondingBranch" value={formData.correspondingBranch} onChange={handleChange} />
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
