const express = require("express");
const mongoose = require("mongoose");
const CustomError = require("./utils/customError");
const errorHandler = require("./middlewares/errorHandler");
const usersRouter = require("./routes/users");
const earningsRouter = require("./routes/earnings");
const reportsRouter = require("./routes/reports");
const http = require('http');
const { initWebSocket } = require("./configs/websocket");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hello, World!"
    });
});

// Routes
app.use('/api/users', usersRouter); // Register a user
app.use('/api/earnings', earningsRouter); // Create a transaction
app.use('/api/reports', reportsRouter); // Reports and analytics
app.use('*', (req, res, next) => {
    throw new CustomError(404, "Route does not exist");
});

// Error handling
app.use(errorHandler);

const server = http.createServer(app);

// MongoDB connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    initWebSocket(server); // WebSocket connection
    // Start server
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})
.catch(err => {
    console.log(err.message);
});