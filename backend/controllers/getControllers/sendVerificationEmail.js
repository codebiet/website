const User = require("../../models/userModal");
const sendEmail = require("../../utils/sendVerificationEmail");
const sendVerificationEmail = async (req, res) => {
  const email = req.cookies["email"];
  let user;
  try {
    user = await User.findOne().findByEmail(email).exec();
  } catch (err) {
    console.log(err);
    return res.redirect("/internalServerError");
  }
  if (user.emailVerified) return res.redirect("/dashboard");
  try {
    const response = await sendEmail(user._id, user.email)
    // console.log("email response is :",response);
    res.set('Cache-Control', 'no-store');
    return res.status(200).send({ msg: "success" });
  } catch (err) {
    console.log(err);
    return res.redirect("/internalServerError");
  }
};
module.exports = sendVerificationEmail;
