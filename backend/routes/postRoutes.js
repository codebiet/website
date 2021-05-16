const express = require("express");
const router = express.Router();

router.route("/signup").post(require("../controllers/postControllers/signup"));
router.route("/login").post(require('../controllers/postControllers/login'));
router.route('/verifyOtp').post(require('../controllers/postControllers/verifyOtp'));
module.exports = router;