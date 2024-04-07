const mongoose = require('mongoose');

const canvasSchema = new mongoose.Schema({
    chunks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chunk',
    }],
    updatedAt: {
            type: Date,
            default: Date.now,
        },
});
const Canvas = mongoose.model('Canvas', canvasSchema);
module.exports = Canvas;