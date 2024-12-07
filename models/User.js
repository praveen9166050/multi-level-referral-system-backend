const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    referralCode: {
        type: String,
        index: {unique: true}
    },
    referredBy: {
        type: String,
        default: null
    },
    directReferrals: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;