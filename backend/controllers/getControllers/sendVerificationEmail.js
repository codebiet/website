const crypto = require("crypto");
const User = require("../../models/userModal");
const sendEmail = require("../../utils/smtpTransport");
const encrypt = (text) => {
  var cipher = crypto.createCipher(
    process.env.ENCRYPTION_ALGO,
    process.env.CRYPTOJS_SECRET
  );
  var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};
const sendVerificationEmail = async (req, res) => {
  const id = req.session.userId;
  //check if email is already verified
  const user = await User.findById(id).exec();
  if (user.emailVerified)
    return res.status(400).send({ error: "Your email is already verified" });
  //encrypt the id and current time
  var encryptedID = encrypt(id);
  var encryptedTime = encrypt((Date.now()).toString());
  //construct link with the encrypted ID and current time
  //a = id && b = time, used bad naming so that verification link do not get very obivious to user or third party
  const link = `${process.env.PROTOCOL}://${process.env.HOST}/verifyEmail?a=${encryptedID}&b=${encryptedTime}`;
  //create the email
  const mailOptions = {
    to: user.email,
    subject: "Please confirm your Email Address",
    html: `<img src="https://media-exp1.licdn.com/dms/image/sync/C4E22AQG4zTDlyguaNQ/feedshare-shrink_800/0/1602572271436?e=1623888000&v=beta&t=Aq2jU_LLoM8lK5Mq7TgYxdf-9tkVZJs3Bc2m0HK68tw" /><br><br>Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a><br>The above link is valid for ${process.env.EMAIL_LINK_VALIDITY} minutes only`,
  };
  try {
    //send email to the user
    let response = await sendEmail(mailOptions);
    console.log(response);
    //render verifyEmail page to inform user that an email has been sent at his registered mobile number now
    return res.render("verifyEmailMsg");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
module.exports = sendVerificationEmail;
