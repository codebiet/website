const User = require("../../models/userModal");
const bcrypt = require("bcryptjs");
module.exports = async (req, res) => {
  let userData = req.body;
  if (!userData.email)
    return res.status(400).send({ errorMsg: "Email is required!" });
  let existingUser;
  try{
    existingUser = await User.findOne().findByEmail(userData.email).exec();
  }catch(err){
    console.log(err);
    return res.status(500).send("Status-Code: 500, Internal Server Error")
  }
  if (existingUser && existingUser.emailVerified)
    return res
      .status(400)
      .send({ errorMsg: "This email is already registered!" });
  else if(existingUser){
    await User.findByIdAndRemove(existingUser._id);
  }
  userData = {
    name: userData.name,
    email: userData.email,
    password: "kslfklk123o2#$lkwr1231",
    role: userData.role,
  };
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userData.password, salt, async (err, hash) => {
      if (err) res.status(500).send({ errorMsg: "Status-Code: 500, Internal Server Error!" });
      userData.password = hash;
      const user = new User(userData);
      let savedUser;
      try{
        savedUser = await user.save();
      }catch(err){
        console.log(err);
        return res.status(500).send({errorMsg:"Status-Code: 500, Internal Server Error!"});
      }
      res.cookie("email", userData.email, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: false,
      });
      return res.status(200).send({});
    });
  });
};
