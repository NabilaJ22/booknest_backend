const express = require('express');
const router = express.Router();
const { addBookmark, getBookmarks, deleteBookmark } = require('../controllers/bookmarkController');
const authMiddleware = require('../middlewares/auth-middleware'); // Middleware to authenticate user

// Add a bookmark
router.post('/', authMiddleware, addBookmark);

// Get all bookmarks
router.get('/', authMiddleware, getBookmarks);

router.delete('/:bookmarkId', authMiddleware, deleteBookmark);

module.exports = router;
