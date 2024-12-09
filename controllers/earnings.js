const { sendUpdate } = require("../configs/websocket");
const Earning = require("../models/Earning");
const Transaction = require("../models/TransactionModel");
const User = require("../models/User");
const CustomError = require("../utils/customError");

const createTransaction = async (req, res, next) => {
    try {
        const {userId, amount} = req.body;
        // Check if the user exists
        const user = await User.findById(userId).populate('referredBy');
        if (!user) {
            throw new CustomError(400, "User with this id does not exist");
        }
        // Create transaction
        const transaction = await Transaction.create({userId, amount});
        // No earnings for parent users if amount is less than 1000
        if (amount < 1000) {
            return res.status(201).json({
                success: true,
                message: "Transaction successful"
            });
        }
        const notifications = [];
        const parentUser = user.referredBy;
        if (parentUser) {
            // Create earnings for direct referral
            await Earning.create({
                userId: parentUser._id,
                referredUserId: userId,
                transactionId: transaction._id,
                level: 1,
                profit: 0.05 * amount,
            });
            notifications.push({
                userId: parentUser._id.toString(),
                message: `You earned ₹ ${0.05 * amount} from your direct referral's transaction`
            });
            const grandParentUser = await User.findById(parentUser.referredBy).populate('referredBy');
            if (grandParentUser) {
                // Create earnings for indirect referral
                await Earning.create({
                    userId: grandParentUser._id,
                    referredUserId: userId,
                    transactionId: transaction._id,
                    level: 2,
                    profit: 0.01 * amount,
                });
                notifications.push({
                    userId: grandParentUser._id.toString(),
                    message: `You earned ₹ ${0.01 * amount} from your indirect referral's transaction`
                });
            }
        }
        // Send real time notification to parent users for their earnings through referral
        notifications.forEach(({userId, message}) => sendUpdate(userId, {type: "earning", message}))
        res.status(201).json({
            success: true,
            message: "Transaction successful"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {createTransaction};