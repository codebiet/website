const express = require("express");
const router = express.Router();
const authLogin = require("../middlewares/authLogin");
const redirectHome = require("../middlewares/redirectHome");
const authAdmin = require("../middlewares/authAdmin");
const authAdminOrUser = require("../middlewares/authAdminOrUser");
const getUserId = require("../middlewares/getUserId");
router
  .route("/loadUser")
  .get(require("../controllers/getControllers/loadUser"));
router
  .route("/login")
  .get(redirectHome, require("../controllers/getControllers/login"));
router
  .route("/signup")
  .get(redirectHome, require("../controllers/getControllers/signup"));
router.route("/sendOtp").get(require("../controllers/getControllers/sendOtp"));
router
  .route("/enterOtp")
  .get(require("../controllers/getControllers/enterOtp"));
router
  .route("/verifyEmailAndPhone")
  .get(authLogin, require("../controllers/getControllers/verifyEmailAndPhone"));
router
  .route("/sendVerificationEmail")
  .get(require("../controllers/getControllers/sendVerificationEmail"));
router
  .route("/verifyEmail")
  .get(require("../controllers/getControllers/verifyEmail"));
router.route("/logout").get(require("../controllers/getControllers/logout"));
router
  .route("/verifyResetPasswordLink")
  .get(require("../controllers/getControllers/verifyResetPasswordLink"));
router
  .route("/resumeData")
  .get(require("../controllers/getControllers/getResumeData"));
router.route("/events/").get(require("../controllers/getControllers/events"));
router
  .route("/events/:id")
  .get(require("../controllers/getControllers/eventById"));
router
  .route("/blogs/suggestions")
  .get(require("../controllers/getControllers/blogSuggestions"));
router
  .route("/blogs/:id?")
  .get(require("../controllers/getControllers/getBlogs"));
router
  .route("/blog/:url")
  .get(require("../controllers/getControllers/getIndividualBlog"));
router
  .route("/reviewBlog/:id")
  .get(authAdminOrUser, require("../controllers/getControllers/reviewBlog"));
router
  .route("/blogs/:id/comments")
  .get(require("../controllers/getControllers/comments"));
router
  .route("/projects")
  .get(getUserId, require("../controllers/getControllers/getProjects"));
router
  .route("/doubts")
  .get(getUserId, require("../controllers/getControllers/getDoubts"));

router.route("/gems").get(require("../controllers/getControllers/getGems"));
router
  .route("/gems/:id")
  .get(require("../controllers/getControllers/gemsById"));
router.route("/jobs").get(require("../controllers/getControllers/getJobs"));
router.route("/roadmaps").get(require("../controllers/getControllers/getAvailableRoadmaps"));
router.route("/roadmaps/:url").get(require("../controllers/getControllers/getIndividualRoadmap"));
router
  .route("/jobs/:id")
  .get(require("../controllers/getControllers/getJobsbyID"));
router
  .route("/jobs/isRegistered/:id")
  .get(
    authAdminOrUser,
    require("../controllers/getControllers/isJobRegistered")
  );
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//------------------------------------ADMIN--------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
router
  .route("/admins")
  .get(authAdmin, require("../controllers/getControllers/admin/getAdmin"));
router
  .route("/admin/events/:id/registrations/")
  .get(require("../controllers/getControllers/admin/registrations"));
router
  .route("/admin/feedbacks")
  .get(require("../controllers/getControllers/admin/feedbacks"));
router
  .route("/admin/jobs/:id/applications")
  .get(require("../controllers/getControllers/admin/jobApplications"));
module.exports = router;
