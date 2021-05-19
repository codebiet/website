const sendEmail = require("./smtpTransport");
const crypto = require("crypto");
const encrypt = (text) => {
  var cipher = crypto.createCipher(
    process.env.ENCRYPTION_ALGO,
    process.env.CRYPTOJS_SECRET
  );
  var encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};
module.exports = (id,email) => {
  //encrypt the id and current time
  console.log('id ',id);
  var encryptedID = encrypt(id.toString());
  var encryptedTime = encrypt(Date.now().toString());
  //construct link with the encrypted ID and current time
  //a = id && b = time, used bad naming so that verification link do not get very obivious to user or third party
  const link = `${process.env.PROTOCOL}://${process.env.HOST}/forgotPassword?a=${encryptedID}&b=${encryptedTime}`;
  //create the email
  const mailOptions = {
    to: email,
    subject: "Reset your Password",
    html: `<img src="https://media-exp1.licdn.com/dms/image/sync/C4E22AQG4zTDlyguaNQ/feedshare-shrink_800/0/1602572271436?e=1623888000&v=beta&t=Aq2jU_LLoM8lK5Mq7TgYxdf-9tkVZJs3Bc2m0HK68tw" /><br><br>Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a><br>The above link is valid for ${process.env.EMAIL_LINK_VALIDITY} minutes only`,
  };
  return new Promise(async (resolve, reject) => {
    try {
      let response = await sendEmail(mailOptions);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};
