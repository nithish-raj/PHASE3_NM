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


app.use(cors({
    // PASTE YOUR NETLIFY URL HERE (e.g., https://my-phase4-form.netlify.app)
    origin: 'https://client-side-form.netlify.app/', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
})); 
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err.message));

app.post('/api/register', validateRegistration, registerUser);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
