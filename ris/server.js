// Import necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
const PORT = process.env.PORT || 5001;

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/sun', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});
const User = mongoose.model('User', userSchema);

// Registration schema and model
const registrationSchema = new mongoose.Schema({
     registrationDate: String,
    dispatchNo: String,
    refNo: String,
    letterDate: String,
    sendersName: String,
    sendersAddress: String,
    subject: String,
    relevantSection: String,
    file: String,
    remarks: String
});
const Registration = mongoose.model('Registration', registrationSchema);

const invoiceSchema = new mongoose.Schema({
    invoiceNo: Number,
    date: String,
    letterNo: String,
    receiversName: String,
    address: String,
    subject: String,
    meansOfSending: { type: String, enum: ['hardcopy', 'email', 'post office'] },
    correspondingBranch: String,
    file: String,
    remarks: String
});
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Middleware
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json());


app.get('/registrations', async (req, res) => {
    try {
        // Fetch registrations data from the database
        const registrations = await Registration.find();

        // Send registrations data as response
        res.status(200).json(registrations);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.query.token;
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }
    jwt.verify(token, 'my_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next(); // Move to the next middleware
    });
};

// Route for user login
app.post('http://localhost:5000/signin', async (req, res) => {
    // Your existing login route
});

// Route for saving registration data
app.post('/registrations', async (req, res) => {
    try {
        // Extract registration data from the request body
        const { registrationDate, dispatchNo, refNo, letterDate, sendersName, sendersAddress, subject, relevantSection, file, remarks } = req.body;

        // Create a new instance of the Registration model
        const newRegistration = new Registration({
            registrationDate,
            dispatchNo,
            refNo,
            letterDate,
            sendersName,
            sendersAddress,
            subject,
            relevantSection,
            file,
            remarks
        });

        // Save the registration data to the database
        await newRegistration.save();

        // Send a success response
        res.status(201).json({ message: 'Registration data saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for saving invoice data
app.post('/invoices', async (req, res) => {
    try {
        // Fetch the last invoice number from the database
        const lastInvoice = await Invoice.findOne().sort({ invoiceNo: -1 });

        // Generate new invoice number
        const newInvoiceNo = lastInvoice ? lastInvoice.invoiceNo + 1 : 1;

        // Extract invoice data from the request body
        const { date, letterNo, receiversName, address, subject, meansOfSending, correspondingBranch, file, remarks } = req.body;

        // Create a new instance of the Invoice model
        const newInvoice = new Invoice({
            invoiceNo: newInvoiceNo,
            date,
            letterNo,
            receiversName,
            address,
            subject,
            meansOfSending,
            correspondingBranch,
            file,
            remarks
        });

        // Save the invoice data to the database
        await newInvoice.save();

        // Send a success response
        res.status(201).json({ message: 'Invoice data saved successfully', invoiceNo: newInvoiceNo });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for retrieving all invoices
app.get('/invoices', async (req, res) => {
    try {
        // Fetch invoices data from the database
        const invoices = await Invoice.find();

        // Send invoices data as response
        res.status(200).json(invoices);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Protected route (requires JWT token)
app.get('/protected', verifyToken, (req, res) => {
    // If the token is valid, the user information will be available in req.user
    res.status(200).json({ message: 'Protected route accessed successfully', user: req.user });
});

// Login page route
app.get('/login', (req, res) => {
    res.status(200).json({ message: 'Please log in' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
