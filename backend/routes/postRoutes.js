const express = require("express");
const router = express.Router();

router.route("/register").post(require("../controllers/postControllers/signup"));
router.route("/login").post(require('../controllers/postControllers/login'));
router.route('/verifyOtp').post(require('../controllers/postControllers/verifyOtp'));
router.route('/recoverPassword').post(require("../controllers/postControllers/recoverPassword"));
router.route('/setPassword').post(require("../controllers/postControllers/setPassword"));
router.route('/changePassword').post(require("../controllers/postControllers/changePassword"));
router.route("/verifyCertificate").post(require('../controllers/postControllers/verifyCertificate'));
module.exports = router;