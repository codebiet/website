const User = require("../../models/userModal");
const OTPService = require("../../utils/otpService");
const jwt = require("jsonwebtoken");
const verifyOtp = async (req, res) => {
  const { otp , type} = req.body;
  const otpVerifyRequestId = req.cookies['otpVerifyRequestId'];
  const token = req.cookies["token"];
  if (!token) return res.status(401).send({ errorMsg: "Unauthorized!" });
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return res.status(401).send({ errorMsg: "Unauthorized!" });
  }
  try {
    const result = await OTPService.verifyOtp(otpVerifyRequestId, otp);
    console.log("result after verification", result);
    if (result.status == 0) {
      console.log("otp verified");
      const user = await User.findById(decoded.id).exec();
      if(!user) return res.status(400).send({errorMsg:"User doesn't exist!"});
      if(type == 'calling'){
        user.callingVerified = true;
      }else if(type == 'whatsApp'){
        user.whatsAppVerified = true;
      }
      await user.save();
      return res.send({msg:"success"});
    } else {
      console.log("otp error!");
      return res.status(400).send({ errorMsg: "OTP Error!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({errorMsg:"Status-Code:500, Internal Server Error!"});
  }
};

module.exports = verifyOtp;
