const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['male', 'female']
    },
    language: {
        type: String,
        required: [true, 'Language is required'],
        enum: ['english', 'spanish', 'french', 'german', 'Arabic']
    },
    message: {
        type: String,
    }
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
