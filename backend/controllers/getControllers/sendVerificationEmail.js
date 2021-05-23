const User = require("../../models/userModal");
const sendEmail = require("../../utils/sendVerificationEmail");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = async (req, res) => {
  const token = req.cookies["token"];
  if (!token) return res.redirect("/pageNotFound");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;
  let user;
  try {
    user = await User.findById(id).exec();
  } catch (err) {
    console.log(err);
    return res.redirect("/internalServerError");
  }
  if (user.emailVerified) return res.redirect("/dashboard");
  try {
    const response = await sendEmail(id, user.email);
    console.log(response);
    res.set("Cache-Control", "no-store");
    return res.status(200).send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.redirect("/internalServerError");
  }
};
module.exports = sendVerificationEmail;
