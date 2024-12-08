const express = require("express");
const { getEarningsReport, getReferralDistribution, getReferralTree } = require("../controllers/reports");

const router = express.Router();

router.route('/earnings/:userId').get(getEarningsReport);
router.route('/referral-distribution/:userId').get(getReferralDistribution);
router.route('/tree/:userId').get(getReferralTree);

module.exports = router;