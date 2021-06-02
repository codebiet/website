const User = require("../../models/userModal");
const jwt = require("jsonwebtoken");
const OTPService = require("../../utils/otpService");
module.exports = async (req, res) => {
  const token = req.cookies["token"];
  const { whatsAppPhoneNumber, callingPhoneNumber } = req.body;
  console.log({whatsAppPhoneNumber,callingPhoneNumber});
  const phoneRegex = /^[0-9]{10}/i;
  if (!token) return res.status(401).send({ errorMsg: "Unauthorized!" });
  if (
    (!whatsAppPhoneNumber && !callingPhoneNumber) ||
    (callingPhoneNumber && (callingPhoneNumber.length != 10 || !phoneRegex.test(callingPhoneNumber))) ||
    (whatsAppPhoneNumber && (whatsAppPhoneNumber.length != 10 || !phoneRegex.test(whatsAppPhoneNumber)))
  )
    return res
      .status(400)
      .send({ errorMsg: "Please provide a valid Phone Number!" });
  let decoded, user;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return res.status(401).send({ errorMsg: "Unauthorized!" });
  }
  try {
    user = await User.findById(decoded.id).exec();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code:500, Internal Server Error!" });
  }
  if (!user) res.status(400).send({ errorMsg: "Invalid Request!" });
  try {
    let mobileNumber;
    if (callingPhoneNumber) {
      mobileNumber = "91" + callingPhoneNumber;
      user.callingPhoneNumber = mobileNumber;
    }
    else if (whatsAppPhoneNumber){
      mobileNumber = "91" + whatsAppPhoneNumber;
      user.whatsAppPhoneNumber = mobileNumber;
    }
    await user.save();
    const otpVerifyRequestId = await OTPService.sendOtp(
      parseInt(mobileNumber)
    ); //verifyRequestId will be used while verifying the otp;
    res.cookie("otpVerifyRequestId", otpVerifyRequestId, {
      expires: new Date(Date.now() + 1000 * 60 * 5),
      httpOnly: false,
    });
    return res.status(200).send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
  }
};
