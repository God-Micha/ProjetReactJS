const mongoose = require('mongoose');

const pixelSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
        validate: /^#[0-9A-F]{6}$/i,
    }
}, { _id: false });

const chunkSchema = new mongoose.Schema({
    chunkId: {
        type: String,
        required: true,
        unique: true,
    },
    coordinates: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
    },
    pixels: [[pixelSchema]],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    canvas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Canvas',
        required: true
    },
});

const Chunk = mongoose.model('Chunk', chunkSchema);

module.exports = Chunk;
