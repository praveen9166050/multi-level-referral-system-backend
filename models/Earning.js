const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Direct', 'Indirect']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Earning = mongoose.model('User', earningSchema);

module.exports = Earning;