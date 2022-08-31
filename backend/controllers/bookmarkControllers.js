const Bookmark = require("../models/bookmarkModel");
const Recommendation = require("../models/recommendationModel");
const asyncHandler = require("express-async-handler");

const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ userAdd: req.user._id });
  res.json(bookmarks);
});

const addBookmark = asyncHandler(async (req, res) => {
  const recommendation = await Recommendation.findById(req.params.id);
  const bookmark = await Bookmark.findOne({
    recId: req.params.id,
    userAdd: req.user._id,
  });

  if (bookmark) {
    res.status(400);
    throw new Error("This recommendation has already been bookmarked");
  }

  if (recommendation) {
    const { title, author, genres, review, rating, image } = recommendation;
    const userCreate = recommendation.user;
    const userCreatePic = recommendation.userPic;
    const userCreateName = recommendation.userName;
    const bookmark = new Bookmark({
      recId: req.params.id,
      userAdd: req.user._id,
      userCreate,
      userCreatePic,
      userCreateName,
      title,
      author,
      genres,
      review,
      rating,
      image,
    });
    const createdBookmark = await bookmark.save();
    res.status(201).json(createdBookmark);
  } else {
    res.status(404);
    throw new Error("Recommendation not found");
  }
});

const removeBookmark = asyncHandler(async (req, res) => {
  const bookmark = await Bookmark.findOne({
    recId: req.params.id,
    userAdd: req.user._id,
  });
  if (bookmark) {
    await bookmark.remove();
    res.json({ message: "Bookmark removed" });
  } else {
    res.status(404);
    throw new Error("Bookmark not found");
  }
});

module.exports = { getBookmarks, addBookmark, removeBookmark };
