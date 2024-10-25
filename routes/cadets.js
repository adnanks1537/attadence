const express = require('express');
const router = express.Router();
const Cadet = require('../models/Cadet');

// Fetch all cadets
router.get('/', async (req, res) => {
    try {
        const cadets = await Cadet.find();
        res.json(cadets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cadets' });
    }
});

// Mark attendance
router.post('/mark', async (req, res) => {
    const { cadetID, status } = req.body;
    if (!cadetID || !status) {
        return res.status(400).json({ message: 'Cadet ID and attendance status are required' });
    }
    try {
        const cadet = await Cadet.findOneAndUpdate(
            { cadetID },
            { $push: { attendance: { status } } },
            { new: true, useFindAndModify: false }
        );
        if (!cadet) {
            return res.status(404).json({ message: 'Cadet not found' });
        }
        res.json({ message: 'Attendance marked', cadet });
    } catch (error) {
        res.status(500).json({ message: 'Error marking attendance' });
    }
});

module.exports = router;
