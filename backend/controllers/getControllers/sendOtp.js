const OTPService = require("../../utils/otpService");
const sendOtp = async (req, res) => {
  try {
    req.session.verifyRequestId = await OTPService.sendOtp(
      parseInt(req.session.mobileNumber)
    ); //verifyRequestId will be used while verifying the otp;
    return res.redirect("/enterOtp");
  } catch (err) {
    console.log(err);
    res.set("Cache-Control", "no-store");
    return res.status(500).send(err);
  }
};
module.exports = sendOtp;
