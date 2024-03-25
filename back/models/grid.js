const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
    _id: Number,
    x: Number,
    y: Number,
    pixels: [[{
        color: String,
    }]],
    lastUpdate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Grid', gridSchema);