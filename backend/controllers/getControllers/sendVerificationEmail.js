const crypto = require("crypto");
const User = require("../../models/userModal");
const sendEmail = require("../../utils/smtpTransport");
const encrypt = (text) => {
  var cipher = crypto.createCipher(process.env.ENCRYPTION_ALGO, process.env.CRYPTOJS_SECRET);
  var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
//   var decipher = crypto.createDecipher(algorithm, key);
//   var decrypted = decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  return encrypted;
};
const sendVerificationEmail = async (req, res) => {
  const id = req.session.userId;
  const user = await User.findById(id).exec();
  if (user.emailVerified)
    return res.status(400).send({ error: "Your email is already verified" });
  var encryptedID = encrypt(id);
  const host = req.get("host");
  req.session.host = host; //to use while verifying through provided link
  const protocol = req.protocol;
  req.session.protocol = protocol; //to use while verifying email through provided link
  const link = `${protocol}://${host}/verifyEmail?id=${encryptedID}`;
  const mailOptions = {
    to: user.email,
    subject: "Please confirm your Email Address",
    html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`,
  };
  try {
    let response = await sendEmail(mailOptions);
    console.log(response);
    // return res
    //   .status(200)
    //   .send({
    //     msg: "An email has been sent to your email address. Click on the provided link to verify your email address",
    //   });
    return res.render("verifyEmail");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
module.exports = sendVerificationEmail;
