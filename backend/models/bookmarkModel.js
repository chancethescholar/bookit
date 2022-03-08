const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      ref: "Recommendation"
    },
    author: {
      type: String,
      required: true,
      ref: "Recommendation"
    },
    genres: {
      type: [String],
      required: true,
      ref: "Recommendation"
    },
    review: {
      type: String,
      required: true,
      ref: "Recommendation"
    },
    rating: {
      type: Number,
      required: true,
      ref: "Recommendation"
    },
    image: {
      type: String,
      required: true,
      default: 'no image',
      ref: "Recommendation"
    },
    recId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Recommendation"
    },
    userAdd: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userCreate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userCreatePic: {
      type: String,
      required: true,
      ref: "User",
    },
    userCreateName: {
      type: String,
      required: true,
      ref: "Recommendation",
    },
  },
  {
    timestamps: true,
  }
);

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
