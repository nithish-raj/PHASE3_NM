const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Crucial for enforcing unique emails!
        trim: true,
        lowercase: true,
    },
    password: {
        type: String, // Stores the HASHED password
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;