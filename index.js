const express = require("express");
const mongoose = require("mongoose");
const CustomError = require("./utils/customError");
const errorHandler = require("./middlewares/errorHandler");
const usersRouter = require("./routes/users");
const earningsRouter = require("./routes/earnings");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello, World!"
    });
});

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/earnings', earningsRouter);

app.use('*', (req, res, next) => {
    throw new CustomError(404, "Route does not exist");
});

app.use(errorHandler);

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})
.catch(err => {
    console.log(err.message);
});