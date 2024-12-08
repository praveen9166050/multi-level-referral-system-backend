const mongoose = require("mongoose");
const Earning = require("../models/Earning");

const getEarningsReport = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const totalEarnings = await Earning.aggregate([
            {
                $group: {
                    _id: null,
                    total: {$sum: '$profit'}
                }
            }
        ]);
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
        res.status(200).json({
            success: true,
            message: "Referral distribution fetched successfully"
        });
    } catch (error) {
        next(error);
    }
}

const getReferralTree = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Referral tree fetched successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {getEarningsReport, getReferralDistribution, getReferralTree};