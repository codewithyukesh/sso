const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 6000;

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

// Middleware
app.use(express.json());

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
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate JWT token upon successful authentication
        const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, 'my_secret_key', { expiresIn: '1h' });
        // Send the generated JWT token back to the client as part of the response
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
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
