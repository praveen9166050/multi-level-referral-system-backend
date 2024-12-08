const getEarningsReport = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Earnings report fetched successfully"
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