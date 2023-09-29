const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
