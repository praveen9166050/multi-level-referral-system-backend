const mongoose = require("mongoose");
const User = require("../models/User");
const CustomError = require("../utils/customError");
const generateReferralCode = require("../utils/generateReferralCode");

const createUser = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {name, email, referredBy} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            throw new CustomError(400, "Email is already registered");
        }
        if (referredBy) {
            const parent = await User.findOne({referralCode: referredBy});
            if (!parent) {
                throw new CustomError(400, "Invalid referral code");
            }
            if (parent.directReferrals.length > 8) {
                throw new CustomError(400, "Limit exceeded for this referral code");
            }
            parent.directReferrals.push(email);
            await parent.save();
        }
        const referralCode = await generateReferralCode();
        const user = await User.create({name, email, referralCode, referredBy});
        await session.commitTransaction();
        await session.endSession();
        res.status(201).json({
            success: true,
            message: "User added successfully",
            user
        });
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

module.exports = {createUser};