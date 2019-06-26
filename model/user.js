const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}); 

const User = mongoose.model('User', userSchema);

module.exports = User;