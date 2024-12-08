const CustomError = require("../utils/customError")

const errorHandler = (err, req, res, next) => {
    console.log("Error:", err);
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}

module.exports = errorHandler;