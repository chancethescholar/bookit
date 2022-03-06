const express = require('express');
const { registerUser, authUser, updateUserProfile, getUserPic } = require('../controllers/userControllers')
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(protect, updateUserProfile);
router.route('/userpic').post(protect, getUserPic);

module.exports = router;
