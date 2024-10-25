const mongoose = require('mongoose');

const CadetSchema = new mongoose.Schema({
    cadetID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rank: { type: String, required: true },
    year: { type: Number, required: true },
    attendance: [
        {
            date: { type: Date, default: Date.now },
            status: { type: String, enum: ['Present', 'Absent'], required: true }
        }
    ]
});

module.exports = mongoose.model('Cadet', CadetSchema);
