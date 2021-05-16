const User = require("../../models/userModal");
const config = require('config');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log({ email, password }, "email or password empty!");
    return res.status(400).send({ error: "Email and password are required!" });
  }
  const user = await User.findOne().findByEmail(email).exec();
  console.log("find user : ",user,"user password : ",user.password);
  if (!user) {
    console.log("Invalid email!");
    return res.status(400).send({ error: "Invalid email!" });
  }
  bcrypt.compare(password, user.password).then(isMatch => {
    if (!isMatch) return res.send({ errorMsg: "Please Check your Password" });
    jwt.sign({ id: user._id }, config.get("jwtSecret"), { expiresIn: 60 * 60 }, (err, token) => {
      if (err) return res.status(500).send(err);
      res.cookie("token", token, {
        maxAge: 60 * 60,
        httpOnly: true,
      });
      req.session.userId = user._id;
      console.log("req.session.userId : ",user._id);
      return res.redirect('/home');
    });
  });
};
module.exports = login;