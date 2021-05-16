const express = require('express');
const router = express.Router();

router.route('/home').get(require('../controllers/getControllers/home'));
router.route('/verifyEmailAndPassword').get(require('../controllers/getControllers/verifyEmailAndPhone'));
router.route('/sendVerificationEmail').get(require('../controllers/getControllers/sendVerificationEmail'));
router.route('/verifyEmail').get(require('../controllers/getControllers/verifyEmail'))

module.exports = router;