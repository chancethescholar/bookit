const mongoose = require('mongoose');

const recommendationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: '../images/no-image.png',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userPic: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

module.exports = Recommendation;
