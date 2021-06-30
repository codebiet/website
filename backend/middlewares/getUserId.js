const User = require("../models/userModal");
const jwt = require("jsonwebtoken");
//this middleware is used to append userId in req.body, if the user is logged in;
//it will not authenticate login
//if userId will be appended only if user is logged in otherwise userId won't appear in req.body;
module.exports = async (req, res, next) => {
  const token = req.cookies["token"];
  let decoded, user;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log('jwt verification failed');
    return next();
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
    req.body = { ...req.body, userId: user._id };
    next();
  } else {
    next();
  }
};
