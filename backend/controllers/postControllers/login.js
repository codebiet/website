const User = require("../../models/userModal");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log({ email, password }, "email or password empty!");
    return res
      .status(400)
      .send({ errorMsg: "Email and password are required!" });
  }
  const user = await User.findOne().findByEmail(email).exec();
  if (!user) {
    console.log("Invalid email!");
    return res.status(400).send({ errorMsg: "This email is not registered!" });
  }
  bcrypt.compare(password, user.password).then((isMatch) => {
    console.log(isMatch);
    if (!isMatch) return res.status(401).send({ errorMsg: "Please Check your Password!" });
    jwt.sign(
      { id: user._id },
      config.get("jwtSecret"),
      { expiresIn: "6h" },
      (err, token) => {
        if (err)
          return res
            .status(500)
            .send({ errorMsg: "Status Code:500, Internal Server Error!" });
        res.cookie("token", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
          httpOnly: false,
        });
        res.cookie("userName", user.name, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
          httpOnly: false,
        });
        res.cookie("userId", user._id, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
          httpOnly: false,
        });
        res.cookie("emailVerified", user.emailVerified, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
          httpOnly: false,
        });
        res.cookie("phoneNumberVerified", user.phoneNumberVeried, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 5),
          httpOnly: false,
        });
        return res.status(200).send({
          token,
          emailVerified: user.emailVerified,
          phoneNumberVerified: user.phoneNumberVerified,
          userName: user.name,
          userId: user._id
        });
      }
    );
  });
};
module.exports = login;
