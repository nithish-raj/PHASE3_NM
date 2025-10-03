const validateRegistration = (req, res, next) => {
    // Added confirmPassword
    const { username, email, password, confirmPassword } = req.body; 

<<<<<<< HEAD
    // 1. Required Field Check (Updated)
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    
    // 2. NEW CHECK: Password Match Enforcement
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Password and Confirmation must match.' });
    }

    // 3. Format and Length Checks (Existing Phase 3 logic)
=======
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
>>>>>>> eb69874119b590ac2184caac046b7c563ff80c2d
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

<<<<<<< HEAD
    // If all checks pass, proceed to the controller
=======
>>>>>>> eb69874119b590ac2184caac046b7c563ff80c2d
    next();
};

module.exports = validateRegistration;
