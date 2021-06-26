const express = require("express");
const router = express.Router();
const authAdmin = require("../middlewares/authAdmin");
const authAdminOrUser = require("../middlewares/authAdminOrUser");
router
  .route("/blogs/suggestions/pickArticle/:id")
  .patch(
    authAdminOrUser,
    require("../controllers/patchControllers/pickArticle")
  );
router
  .route("/blogs/:id/submitForReview")
  .patch(
    authAdminOrUser,
    require("../controllers/patchControllers/submitBlogForReview")
  );
router
  .route("/blogs/:id/saveAsDraft")
  .patch(
    authAdminOrUser,
    require("../controllers/patchControllers/saveAsDraft")
  );
router
  .route("/blogs/:id/comment")
  .patch(authAdmin, require("../controllers/patchControllers/comment"));
router
  .route("/blogs/:blogId/comment/:id/reply")
  .patch(authAdmin, require("../controllers/patchControllers/commentReply"));
router
  .route("/updateproject/:project_id")
  .patch(require("../controllers/patchControllers/updateProject"));
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//-------------------------------------admin routes-------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
router
  .route("/admin/:id/deleteAdmin")
  .patch(
    authAdmin,
    require("../controllers/patchControllers/admin/deleteAdmin")
  );
router
  .route("/event/:id")
  .patch(require("../controllers/patchControllers/admin/event"));
router
  .route("/admin/blogs/updateSuggestion/:id")
  .patch(
    authAdmin,
    require("../controllers/patchControllers/admin/blogSuggestion")
  );
router
  .route("/admin/blogs/suggestion/:id/disapprove")
  .patch(
    authAdmin,
    require("../controllers/patchControllers/admin/disapproveBlogSuggestion")
  );
router
  .route("/admin/blogs/:id/approve")
  .patch(
    authAdmin,
    require("../controllers/patchControllers/admin/approveBlog")
  );
router
  .route("/admin/blogs/:id/discard")
  .patch(
    authAdmin,
    require("../controllers/patchControllers/admin/discardBlog")
  );
module.exports = router;
