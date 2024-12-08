const crypto = require('crypto');
const User = require('../models/User');

const generateReferralCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    code = crypto.randomBytes(4).toString('hex');
    exists = await User.findOne({ referralCode: code });
  }
  return code;
};

module.exports = generateReferralCode;