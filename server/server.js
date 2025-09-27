require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { registerUser } = require('./userController');
const validateRegistration = require('./validation');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Fixes communication issues between client and server
app.use(express.json()); // Allows server to read JSON body

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err.message));

// --- API Route Definition ---
// The request hits validation first, then the controller
app.post('/api/register', validateRegistration, registerUser);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});