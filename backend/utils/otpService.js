require("dotenv").config();
const Nexmo = require("nexmo");
const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const NEXMO_BRAND_NAME = process.env.NEXMO_BRAND_NAME;
const nexmo = new Nexmo(
  {
    apiKey: NEXMO_API_KEY,
    apiSecret: NEXMO_API_SECRET,
  },
  {
    debug: true,
  }
);

const sendOtp = (mobileNumber) => {
  return new Promise((resolve, reject) => {
    nexmo.verify.request(
      {
        number: mobileNumber,
        brand: NEXMO_BRAND_NAME,
        next_event_wait: 60,
        pin_expiry: 60,
      },
      (err, result) => {
        if (err) {
          console.log("Error while sending otp");
          reject(err);
        } else {
          console.log("otp sent successfully!");
          console.log(result);
          resolve(result.request_id); // for verifyRequestId
        }
      }
    );
  });
};
const verifyOtp = (verifyRequestId, otp) => {
  console.log(verifyRequestId, otp);
  return new Promise((resolve, reject) => {
    nexmo.verify.check(
      {
        request_id: verifyRequestId,
        code: otp,
      },
      (err, result) => {
        if (err) {
          reject("Error while verifying the OTP!");
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  sendOtp,
  verifyOtp,
};
