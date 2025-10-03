const bcrypt = require('bcryptjs');
const User = require('./userModel'); 

const registerUser = async (req, res) => {
    // Added confirmPassword to destructuring
    const { username, email, password, confirmPassword } = req.body;

    try {
        // 1. Uniqueness Check (remains the same)
        const existingUser = await User.findOne().or([{ email }, { username }]);
        if (existingUser) {
            return res.status(409).json({ error: 'This email or username is already registered.' });
        }

        // 2. Password Hashing (Logic remains the same, using only the original password)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create and Save New User (Logic remains the same)
        const newUser = new User({
            username,
            email,
            password: hashedPassword 
        });

        await newUser.save();

        // 4. Success Response
        return res.status(201).json({ message: 'Registration successful!' });

    } catch (err) {
        console.error('SERVER ERROR during registration:', err.message);
        return res.status(500).json({ error: 'Server error during registration.' });
    }
};

module.exports = {
    registerUser
};