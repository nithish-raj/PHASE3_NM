require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { registerUser } = require('./userController');
const validateRegistration = require('./validation');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors()); 
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err.message));

app.post('/api/register', validateRegistration, registerUser);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
