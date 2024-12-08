const createTransaction = async (req, res, next) => {
    try {
        res.status(201).json({
            success: true,
            message: "Earning calculated successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {createTransaction};