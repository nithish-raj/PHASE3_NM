const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;

    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // 2. Length and Format Checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (username.length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters long.' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    // If all checks pass, move to the controller
    next();
};

module.exports = validateRegistration;
