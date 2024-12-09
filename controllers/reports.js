const mongoose = require("mongoose");
const Earning = require("../models/Earning");
const User = require("../models/User");
const CustomError = require("../utils/customError");

const getEarningsReport = async (req, res, next) => {
    try {
        const {userId} = req.params;
        // Calculate total earnings for a user through referrals
        const totalEarnings = await Earning.aggregate([
            {
                $group: {
                    _id: null,
                    total: {$sum: '$profit'}
                }
            }
        ]);
        // Calculate total earnings for a user through referrals at each level (direct and indirect)
        const levelWiseEarnings = await Earning.aggregate([
            {
                $match: {userId: new mongoose.Types.ObjectId(userId)}
            },
            {
                $group: {
                    _id: '$level',
                    total: {$sum: '$profit'}
                }
            }
        ]);
        // Fetch history of eranings through referrals of a user
        const earningsHistory = await Earning.find({userId}).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            message: "Earnings report fetched successfully",
            totalEarnings: totalEarnings[0].total,
            levelWiseEarnings,
            earningsHistory
        });
    } catch (error) {
        next(error);
    }
}

const getReferralDistribution = async (req, res, next) => {
    try {
        const {userId} = req.params;
        // Fetch total earnings of a user through each referred user
        const referrals = await Earning.aggregate([
            {
                $match: {userId: new mongoose.Types.ObjectId(userId)}
            },
            {
                $group: {
                    _id: '$referredUserId',
                    totalEarnings: {$sum: '$profit'}
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'referredUser',
                    pipeline: [{$project: {name: 1, email: 1}}]
                }
            },
            {
                $project: {
                    referredUser: {$arrayElemAt: ['$referredUser' , 0]},
                    totalEarnings: 1
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Referral distribution fetched successfully",
            referrals
        });
    } catch (error) {
        next(error);
    }
}

const getReferralTree = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        if (!user) {
            throw new CustomError(400, "User with this id does not exist");
        }
        // Fetch referral hierarchy tree of a user
        const tree = await user.populate({
            path: 'referredBy',
            populate: {
                path: 'referredBy'
            }
        });
        res.status(200).json({
            success: true,
            message: "Referral tree fetched successfully",
            tree
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {getEarningsReport, getReferralDistribution, getReferralTree};