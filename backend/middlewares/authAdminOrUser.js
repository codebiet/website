const User = require("../models/userModal");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) return res.status(401).send({ errorMsg: "Unauthorized!" });
  let decoded, user;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return res.status(401).send({ errorMsg: "Unauthorized!" });
  }
  try {
    user = await User.findById(decoded.id).exec();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ errorMsg: "Status-Code:500, Internal Server Error!" });
  }
  if (user) {
    req.body = { ...req.body, isAdmin: user.isAdmin, userId: user._id };
    next();
  } else {
    return res.status(401).send({ errorMsg: "Unauthorized!" });
  }
};
