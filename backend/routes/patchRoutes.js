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
router.route('/admin/blogs/updateSuggestion/:id').patch(require('../controllers/patchControllers/admin/blogSuggestion'));
module.exports = router;
