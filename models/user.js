// models/user.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Password: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema); // Use 'User' instead of 'Product'
