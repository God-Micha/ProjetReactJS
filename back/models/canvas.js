const mongoose = require('mongoose');

const canvasSchema = new mongoose.Schema({
    chunks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chunk',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    editDelay: {
        type: Number,
        required: true,
    },
});
canvasSchema.pre('save', function(next) {
    if (this.endDate < Date.now()) {
        this.status = 'inactive';
    }
    next();
});

const Canvas = mongoose.model('Canvas', canvasSchema);
module.exports = Canvas;
