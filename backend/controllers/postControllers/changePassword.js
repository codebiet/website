const User = require("../../models/userModal");
const bcrypt = require("bcryptjs");
const decrypt = require("../../utils/decrypt");
const changePassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword)
    return res.status(400).send({ errorMsg: "Both the fields are required!" });
  //both password and confirmPassword supplied in the body;
  if (password != confirmPassword)
    return res.status(401).send({ errorMsg: "Passwords don't match!" });
  //passwords matched
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
    return res.status(500).send({ error: "Internal Server Error" });
  }
  if (!user)
    return res
      .status(400)
      .send({ error: "This link is not valid now! Please get a new link." });
  //valid userId;
  const timeElapsed = (Date.now() - decryptedTime) / (1000 * 60); //in minutes;
  if (timeElapsed > process.env.EMAIL_LINK_VALIDITY)
    return res
      .status(400)
      .send({ error: "This link is not valid now! Please get a new link." });
  //password is changed in valid time duration
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) res.status(500).send({ error: "Internal Server Error" });
      user.password = hash;
      try {
        await user.save();
        return res.send({ msg: "success" });
      } catch (err) {
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });
  });
};
module.exports = changePassword;
