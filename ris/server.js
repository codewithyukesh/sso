// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(express.json());

// Routes
app.post('http://localhost:5000/signin', (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // Generate JWT token upon successful authentication
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
    
        // Send the generated JWT token back to the client as part of the response
        res.status(200).json({ message: 'User signed in successfully', token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
 

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
