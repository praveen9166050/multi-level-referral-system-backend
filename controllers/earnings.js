const calculateEarning = async (req, res, next) => {
    try {
        res.status(201).json({
            success: true,
            message: "Earning calculated successfully"
        });
    } catch (error) {
        next(error);
    }
}

const getEarnings = async (req, res, next) => {
    try {
        res.status(201).json({
            success: true,
            message: "Earnings fetched successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {calculateEarning, getEarnings};