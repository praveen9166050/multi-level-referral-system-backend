const addUser = async (req, res, next) => {
    try {
        res.status(201).json({
            success: true,
            message: "User added successfully"
        });
    } catch (error) {
        next(error);
    }
}

const getUsers = async (req, res, next) => {
    try {
        res.status(201).json({
            success: true,
            message: "Users fetched successfully"
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {addUser, getUsers};