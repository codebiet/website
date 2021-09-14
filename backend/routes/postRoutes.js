const express = require("express");
const router = express.Router();
const authAdmin = require("../middlewares/authAdmin");
const authAdminOrUser = require("../middlewares/authAdminOrUser");
router
  .route("/register")
  .post(require("../controllers/postControllers/signup"));
router.route("/login").post(require("../controllers/postControllers/login"));
router
  .route("/verifyOtp")
  .post(require("../controllers/postControllers/verifyOtp"));
router
  .route("/recoverPassword")
  .post(require("../controllers/postControllers/recoverPassword"));
router
  .route("/setPassword")
  .post(require("../controllers/postControllers/setPassword"));
router
  .route("/changePassword")
  .post(require("../controllers/postControllers/changePassword"));
router
  .route("/verifyCertificate")
  .post(require("../controllers/postControllers/verifyCertificate"));
router
  .route("/updateProfile")
  .post(require("../controllers/postControllers/updateProfile"));
router
  .route("/contact")
  .post(require("../controllers/postControllers/contact"));
router
  .route("/updateMobile")
  .post(require("../controllers/postControllers/updateMobile"));
router
  .route("/resendOtp")
  .post(require("../controllers/postControllers/resendOtp"));
router
  .route("/uploadfile")
  .post(require("../controllers/postControllers/uploadFile"));
router
  .route("/event/:id/register")
  .post(require("../controllers/postControllers/eventRegistration"));
router
  .route("/job/:id/register")
  .post(
    authAdminOrUser,
    require("../controllers/postControllers/jobRegistration")
  );
router
  .route("/blogs/addSuggestion")
  .post(
    authAdminOrUser,
    require("../controllers/postControllers/addBlogSuggestion")
  );
router
  .route("/newsletter")
  .post(require("../controllers/postControllers/newsletter"));
router
  .route("/feedback")
  .post(require("../controllers/postControllers/feedback"));
router
  .route("/askDoubt")
  .post(authAdminOrUser, require("../controllers/postControllers/askDoubt"));
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//-------------------------------------admin routes-------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
router
  .route("/admin/addAdmin")
  .post(authAdmin, require("../controllers/postControllers/admin/addAdmin"));
router
  .route("/admin/addEvent")
  .post(require("../controllers/postControllers/admin/addEvent"));
router
  .route("/admin/addRoadmap")
  .post(require("../controllers/postControllers/admin/addRoadmap"));
router
  .route("/admin/events/:id/registrations/sendMsg")
  .post(require("../controllers/postControllers/admin/sendMsg"));
router
  .route("/admin/write-blog")
  .post(authAdmin, require("../controllers/postControllers/admin/writeBlog"));
router
  .route("/admin/addproject")
  .post(require("../controllers/postControllers/addProject"));
router
  .route("/admin/addjob")
  .post(require("../controllers/postControllers/admin/addJobs"));
module.exports = router;
