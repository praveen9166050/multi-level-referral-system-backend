const mongoose = require("mongoose");
const User = require("../models/User");
const CustomError = require("../utils/customError");
const { sendUpdate } = require("../configs/websocket");

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
            const parentUser = await User.findById(referredBy);
            if (!parentUser) {
                throw new CustomError(400, "Parent user with this id does not exist");
            }
            if (parentUser.referralCount > 8) {
                throw new CustomError(400, "Referral limit exceeded");
            }
            parentUser.referralCount += 1;
            await parentUser.save();
        }
        const user = await User.create({name, email, referredBy});
        await session.commitTransaction();
        await session.endSession();
        sendUpdate(referredBy, {type: 'register', message: `${name} (${email}) registered through your referral`});
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
}

module.exports = {createUser};