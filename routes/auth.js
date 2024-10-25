const express = require('express');
const router = express.Router();

// Mock login (for demonstration; replace with actual user model and hashed passwords in production)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.json({ message: 'Login successful', token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;