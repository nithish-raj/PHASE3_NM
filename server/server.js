require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit'); // <-- NEW IMPORT

const validateRegistration = require('./validation');
const { registerUser } = require('./userController');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- DEFINE RATE LIMITER POLICY ---
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 5, // Max 5 requests per IP per window (Security Measure)
    message: "Too many registration attempts from this IP. Please try again after 15 minutes."
});

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected successfully.'))
  .catch(err => {
    console.error('Mongo connection error:', err.message);
    process.exit(1); 
  });


// --- Routes ---
// Apply the rate limiter BEFORE validation and controller
app.post('/api/register', apiLimiter, validateRegistration, registerUser);

// --- Server Start ---
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));