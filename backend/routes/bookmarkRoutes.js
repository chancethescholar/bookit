const express = require("express");
const { getBookmarks, addBookmark }
= require("../controllers/bookmarkControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get(protect, getBookmarks);
router.route('/add/:id').post(protect, addBookmark);
//router.route('remove/:id').delete(protect, );

module.exports = router;
