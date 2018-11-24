const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: ''
    }
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
