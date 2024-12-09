const express = require("express");
const { getEarningsReport, getReferralDistribution, getReferralTree } = require("../controllers/reports");

const router = express.Router();

// Reports and analytics
router.route('/earnings/:userId').get(getEarningsReport);
router.route('/referral-distribution/:userId').get(getReferralDistribution);
router.route('/referral-tree/:userId').get(getReferralTree);

module.exports = router;