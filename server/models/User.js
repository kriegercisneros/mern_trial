const mongoose = require('mongoose');

//initializing a new instance of a mongoose schema to make a user table with the following structure
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        //trim set to true removes all white space before and after an address is stored
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        //enumerate either admin or employee, cannot have any other role
        enum: ['admin', 'employee'],
        required: true
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
