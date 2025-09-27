const User = require('./userModel');
const bcrypt = require('bcryptjs'); // Library for secure password hashing

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // --- 1. Uniqueness Check (Security) ---
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            let errorMsg = existingUser.email === email ? 'This email is already registered.' : 'Username is already taken.';
            return res.status(409).json({ error: errorMsg }); // 409 Conflict
        }

        // --- 2. Password Hashing (Core Security Feature) ---
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // --- 3. Create and Save User (Data Persistence) ---
        const newUser = new User({
            username,
            email,
            password: hashedPassword // Store the HASH
        });

        await newUser.save();
        
        console.log(`User ${username} saved successfully.`);
        res.status(201).json({ message: 'Registration successful!' }); // 201 Created

    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

module.exports = { registerUser };