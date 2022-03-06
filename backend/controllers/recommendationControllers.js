const Recommendation = require("../models/recommendationModel");
const asyncHandler = require("express-async-handler");

const getRecommendations = asyncHandler(async (req, res) => {
  const recommendations = await Recommendation.find({ user: req.user._id })
  res.json(recommendations);
});

const getAllRecommendations = asyncHandler(async (req, res) => {
  const recommendations = await Recommendation.find()
  res.json(recommendations);
});

const createRecommendation = asyncHandler(async (req, res) => {
  const { title, author, genres, review, rating, image } = req.body;

  if (!title || !author || !genres || !review || !rating || !image) {
    res.status(400);
    throw new Error("Please fill out all fields.");
  }
  else {
    const recommendation = new Recommendation({ user: req.user._id, userPic: req.user.pic, title, author, genres, review, rating, image });
    const createdRecommendation = await recommendation.save();
    res.status(201).json(createdRecommendation);
  }
})

const getRecommendationById = asyncHandler(async (req, res) => {
  const recommendation = await Recommendation.findById(req.params.id);

  if (recommendation) {
    res.json(recommendation);
  }

  else {
    res.status(404).json({ message: "Recommendation not found." });
  }
})

const updateRecommendation = asyncHandler(async (req, res) => {
  const { title, author, genres, review, rating, image } = req.body;

  const recommendation = await Recommendation.findById(req.params.id);

  if(recommendation.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to perform this action");
  }

  if (recommendation) {
    recommendation.title = title;
    recommendation.author = author;
    recommendation.genres = genres;
    recommendation.review = review;
    recommendation.rating = rating;
    recommendation.image = image;

    const updatedRecommendation = await recommendation.save();
    res.json(updatedRecommendation);
  }

  else {
    res.status(404);
    throw new Error("Recommendation not found");
  }
})

const deleteRecommendation = asyncHandler( async(req, res) => {
  const recommendation = await Recommendation.findById(req.params.id);

  if (recommendation.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You are not authorized to perform this action");
  }

  if (recommendation) {
    await recommendation.remove();
    res.json({ message: "Recommendation deleted" });
  }

  else {
    res.status(404);
    throw new Error("Recommendation not found");
  }
})

module.exports = { getRecommendations, getAllRecommendations, createRecommendation, getRecommendationById, updateRecommendation, deleteRecommendation };
