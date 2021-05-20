const User = require("../../models/userModal");
const bcrypt = require("bcryptjs");
const decrypt = require('../../utils/decrypt');
const setPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword)
    return res.status(400).send({ errorMsg: "Both the fields are required!" });
  //both password and confirmPassword supplied in the body;
  if (password != confirmPassword)
    return res.status(401).send({ errorMsg: "Passwords don't match!" });
  //passwords matched
  const encryptedID = req.query.id;
  console.log(encryptedID);
  //decrypt ID
  const decryptedID = decrypt(encryptedID);
  let user;
  try {
    user = await User.findById(decryptedID).exec();
  } catch (err) {
    return res.status(500).send({ errorMsg: "Internal Server Error" });
  }
  if (!user)
    return res
      .status(400)
      .send({ errorMsg: "This link is not valid!" });
  //valid userId;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) res.status(500).send({ errorMsg: "Internal Server Error" });
      user.password = hash;
      try {
        await user.save();
        return res.send({ msg: "success" });
      } catch (err) {
        return res.status(500).send({ errorMsg: "Internal Server Error" });
      }
    });
  });
};
module.exports = setPassword;
