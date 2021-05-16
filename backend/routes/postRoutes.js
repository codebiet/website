const express = require("express");
const router = express.Router();

router.route("/signup").post(require("../controllers/postControllers/signup"));

module.exports = router;