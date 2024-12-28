const Review = require('../models/reviewModel'); // Updated the model import

const createReview = async (req, res) => { // Changed createBlog to createReview
  const { heading, content } = req.body;
  const userId = req.user.id; // ID of the logged-in user

  try {
    const newReview = new Review({
      heading,
      content,
      user: userId, // Associate the review with the user
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).send('Server error');
  }
};

const getAllReviews = async (req, res) => { // Changed getAllBlogs to getAllReviews
  try {
    const reviews = await Review.find().populate('user', 'username');
    const sanitizedReviews = reviews.map((review) => ({
      ...review.toObject(),
      user: review.user || { username: 'Anonymous' },
    }));

    res.json(sanitizedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getReviewById = async (req, res) => { // Changed getBlogById to getReviewById
  try {
    const review = await Review.findById(req.params.id).populate('user', 'username');
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateReview = async (req, res) => { // Changed updateBlog to updateReview
  try {
    const { heading, content } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the logged-in user is the owner
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    review.heading = heading || review.heading;
    review.content = content || review.content;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteReview = async (req, res) => { // Changed deleteBlog to deleteReview
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getReviewCountByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the user is authenticated and `req.user` contains their ID
    const reviews = await Review.find({ user: userId }); // Retrieve reviews for the user
    const reviewCount = reviews.length; // Get the count using the array's length property

    res.json({ userId, reviewCount });
  } catch (error) {
    console.error('Error fetching review count:', error);
    res.status(500).json({ error: 'Server error' });
  }
};





module.exports = { createReview, getAllReviews, getReviewById, updateReview, deleteReview, getReviewCountByUser }; // Updated exports
