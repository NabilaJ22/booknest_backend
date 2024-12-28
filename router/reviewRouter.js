const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController'); // Updated to reference reviewController
const authMiddleware = require('../middlewares/auth-middleware');


router.get('/count', authMiddleware, reviewController.getReviewCountByUser);

// Define dynamic routes after specific ones
router.get('/:id', reviewController.getReviewById);

// Other routes
router.post('/', authMiddleware, reviewController.createReview);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);
router.get('/', reviewController.getAllReviews);



module.exports = router;

