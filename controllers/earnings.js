const { sendUpdate } = require("../configs/websocket");
const Earning = require("../models/Earning");
const Transaction = require("../models/TransactionModel");
const User = require("../models/User");
const CustomError = require("../utils/customError");

const createTransaction = async (req, res, next) => {
    try {
        const {userId, amount} = req.body;
        const user = await User.findById(userId).populate('referredBy');
        if (!user) {
            throw new CustomError(400, "User with this id does not exist");
        }
        const transaction = await Transaction.create({userId, amount});
        if (amount < 1000) {
            return res.status(201).json({
                success: true,
                message: "Transaction successful"
            });
        }
        const notifications = [];
        const parentUser = user.referredBy;
        if (parentUser) {
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