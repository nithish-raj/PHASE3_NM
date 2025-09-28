const User = require('./userModel');
const bcrypt = require('bcryptjs'); 

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
       
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            let errorMsg = existingUser.email === email ? 'This email is already registered.' : 'Username is already taken.';
            return res.status(409).json({ error: errorMsg }); 
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword 
        });

        await newUser.save();
        
        console.log(`User ${username} saved successfully.`);
        res.status(201).json({ message: 'Registration successful!' }); 

    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

module.exports = { registerUser };
