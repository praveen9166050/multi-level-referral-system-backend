const express = require("express");
const { createTransaction } = require("../controllers/earnings");

const router = express.Router();

// Create a transaction
router.route('/transaction').post(createTransaction);

module.exports = router;