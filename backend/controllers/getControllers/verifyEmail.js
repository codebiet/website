const crypto = require("crypto");
const User = require("../../models/userModal");
const decrypt = (cipher) => {
  const decipher = crypto.createDecipher(
    process.env.ENCRYPTION_ALGO,
    process.env.CRYPTOJS_SECRET
  );
  var decrypted =
    decipher.update(cipher, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
};
const verifyEmail = async (req, res) => {
  const host = req.get("host");
  if (
    `${req.protocol}://${host}` ==
    `${process.env.PROTOCOL}://${process.env.HOST}`
  ) {
    //domain matched
    const encryptedID = req.query.a; //since a = id
    const encryptedTime = req.query.b; //since b = time
    console.log(encryptedID);
    console.log(encryptedTime);
    //decrypt ID and Time
    const decryptedID = decrypt(encryptedID);
    const decryptedTime = decrypt(encryptedTime);
    let user;
    try {
      user = await User.findById(decryptedID).exec();
    } catch (err) {
      console.log(err);
      res.status(500).send({ errorMsg: "Internal Server Error, Try Again!" });
    }
    if (!user) return res.status(400).send({ errorMsg: "Invalid Request!" });
    // if (user) {
    const timeElapsed = process.env.EMAIL_LINK_VALIDITY;
    //if you want to verify time duration then uncomment the below line, and comment the above line;
    // const timeElapsed = (Date.now() - decryptedTime) / (1000 * 60); //in minutes;
    console.log(user);
    if (timeElapsed > process.env.EMAIL_LINK_VALIDITY)
      return res
        .status(400)
        .send({ errorMsg: "Invalid Request! This link is not active." });
    //this block will execute always if you don't verify time duration;
    //email link is clicked in valid time duration
    user.emailVerified = true;
    try {
      await user.save();
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send({ errorMsg: "Internal Server Error, Try Again!" });
    }
    res.cookie("emailVerified", user.emailVerified, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
      httpOnly: false,
    });
    return res.redirect("/setPassword?id="+user._id);
  } else {
    //domain didn't matched
    res.status(400).send({ errorMsg: "Invalid request!" });
  }
};
module.exports = verifyEmail;
