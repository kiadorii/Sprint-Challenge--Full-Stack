const mongoose = require('mongoose');

const UserSchema = new mongoose.Schemoa({
    username: {
        name: String,
        description: String,
        budegetedAmount: Number,
        isActive: required
    }
});

module.exports = mongoose.model('User', UserSchema);