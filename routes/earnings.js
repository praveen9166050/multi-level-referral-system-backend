const express = require("express");
const { calculateEarning, getEarnings } = require("../controllers/earnings");

const router = express.Router();

router.route('/').post(calculateEarning);
router.route('/:userId').get(getEarnings);

module.exports = router;