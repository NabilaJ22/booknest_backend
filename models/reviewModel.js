const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
});

const Review = mongoose.model('Review', reviewSchema); // Changed Blog to Review

module.exports = Review; // Exporting the Review model




