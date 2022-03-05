const express = require("express");
const { getRecommendations, getAllRecommendations, createRecommendation, getRecommendationById, updateRecommendation, deleteRecommendation }
= require("../controllers/recommendationControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route('/').get(protect, getRecommendations);
router.route('/all').get(protect, getAllRecommendations);
router.route('/create').post(protect, createRecommendation);
router.route('/:id').get(getRecommendationById);
router.route('/:id').put(protect, updateRecommendation);
router.route('/:id').delete(protect, deleteRecommendation);

module.exports = router;
