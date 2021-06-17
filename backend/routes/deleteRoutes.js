const express = require("express");
const router = express.Router();
const authAdmin = require("../middlewares/authAdmin");
const authAdminOrUser = require("../middlewares/authAdminOrUser");
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//-------------------------------------admin routes-------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
router
  .route("/event/:id")
  .delete(require("../controllers/deleteControllers/admin/event"));
router
  .route("/blogs/suggestion/:id")
  .delete(
    authAdmin,
    require("../controllers/deleteControllers/admin/blogSuggestion")
  );
module.exports = router;
