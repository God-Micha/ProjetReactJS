const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pixelActionSchema = new mongoose.Schema({
    canvasId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Canvas',
    },
    lastPixelTime: {
        type: Date,
        default: Date.now,
    },
}, {_id: false});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    numberOfPixels: { type: Number, default: 0 },
    pixelActions: [pixelActionSchema],
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
