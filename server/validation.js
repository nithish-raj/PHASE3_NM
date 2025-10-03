const validateRegistration = (req, res, next) => {
    // Added confirmPassword
    const { username, email, password, confirmPassword } = req.body; 

    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    next();
};

module.exports = validateRegistration;
