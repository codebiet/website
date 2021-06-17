const express = require("express");
const router = express.Router();
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
  .patch(require("../controllers/patchControllers/admin/blogSuggestion"));
router
  .route("/admin/blogs/suggestion/:id/disapprove")
  .patch(require("../controllers/patchControllers/admin/disapproveBlogSuggestion"));
module.exports = router;
