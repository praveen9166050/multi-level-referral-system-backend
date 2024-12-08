const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    referredUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    level: {
        type: Number,
        enum: [1, 2],
        required: true
    },
    profit: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Earning = mongoose.model('Earning', earningSchema);

module.exports = Earning;