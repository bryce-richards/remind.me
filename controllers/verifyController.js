const User = require('../models/User');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFICATION_SID } = process.env;

const Twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const formatPhone = phone => {
  // remove any character between numers and prepend "+1" (U.S. number)
  return "+1" + phone.replace(/\D/g,'');
};

exports.requestCode = async (req, res) => {
  const { phone } = req.body;
  const phoneNumber = formatPhone(phone);

  try {
    const verificationRequest = await Twilio.verify.services(TWILIO_VERIFICATION_SID)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    res.send(verificationRequest);
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.checkCode = async (req, res) => {
  const { phone, code } = req.body;
  const phoneNumber = formatPhone(phone);

  try {
    const verificationResult = await Twilio.verify.services(TWILIO_VERIFICATION_SID)
      .verificationChecks
      .create({ to: phoneNumber, code });

    res.send(verificationResult);
  } catch (err) {
    return res.status(500).send(err);
  }
};