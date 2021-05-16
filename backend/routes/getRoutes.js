const express = require("express");
const router = express.Router();
const authLogin = require("../middlewares/authLogin");
const authActiveUser = require("../middlewares/authActiveUser");
const redirectHome = require('../middlewares/redirectHome');
router
  .route("/")
  .get(
    authLogin,
    authActiveUser,
    require("../controllers/getControllers/home")
  );
router
  .route("/home")
  .get(
    authLogin,
    authActiveUser,
    require("../controllers/getControllers/home")
  );
router.route("/login").get(redirectHome,require("../controllers/getControllers/login"));
router.route("/signup").get(redirectHome,require("../controllers/getControllers/signup"));
router.route("/sendOtp").get(redirectHome, require("../controllers/getControllers/sendOtp"));
router
  .route("/enterOtp")
  .get(require("../controllers/getControllers/enterOtp"));
router
  .route("/verifyEmailAndPhone")
  .get(authLogin, require("../controllers/getControllers/verifyEmailAndPhone"));
router
  .route("/sendVerificationEmail")
  .get(
    authLogin,
    require("../controllers/getControllers/sendVerificationEmail")
  );
router
  .route("/verifyEmail")
  .get(authLogin, require("../controllers/getControllers/verifyEmail"));

module.exports = router;
