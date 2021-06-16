const express = require("express");
const router = express.Router();
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//-------------------------------------admin routes-------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
router
  .route("/event/:id")
  .delete(require("../controllers/deleteControllers/admin/event"));
router.route('/blogs/suggestion/:id').delete(require('../controllers/deleteControllers/admin/blogSuggestion'));
module.exports = router;
