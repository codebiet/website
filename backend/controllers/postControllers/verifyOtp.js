const User = require("../../models/userModal");
const OTPService = require("../../utils/otpService");
const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  console.log(req.session.verifyRequestId,otp);
  try {
    const result = await OTPService.verifyOtp(req.session.verifyRequestId, otp);
    console.log("result after verification", result);
    if (result.status == 0) {
      console.log("otp verified");
      req.session.verifyRequestId = null;
      const user = await User.findById(req.session.userId).exec();
      user.phoneNumberVerified = true;
      await user.save();
      res.set("Cache-Control", "no-store");
      return res.redirect("/home");
    } else {
      console.log("otp error!");
      return res.status(400).send({ error: "OTP Error!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = verifyOtp;
