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
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//-------------------------------------admin routes-------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
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
module.exports = router;
