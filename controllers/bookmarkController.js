const Bookmark = require('../models/bookmarkModel');

// Add a new bookmark
exports.addBookmark = async (req, res) => {
    const { bookId, name, description } = req.body;
  
    try {
      // Check if the book is already bookmarked by this user
      const existingBookmark = await Bookmark.findOne({
        userId: req.user.id,
        bookId,
      });
  
      if (existingBookmark) {
        return res.status(400).json({ message: 'Book already bookmarked' });
      }
  
      // Create a new bookmark
      const newBookmark = new Bookmark({
        userId: req.user.id,
        bookId,
        name,
        description,
      });
  
      await newBookmark.save();
      res.status(201).json({ message: 'Book bookmarked successfully', newBookmark });
    } catch (error) {
      res.status(500).json({ message: 'Error bookmarking book', error });
    }
  };

// Get all bookmarks for a user
exports.getBookmarks = async (req, res) => {
    try {
      const bookmarks = await Bookmark.find({ userId: req.user.id }).select(
        '_id bookId name description' // Exclude MongoDB ID and include only necessary fields
      );
      res.status(200).json(bookmarks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookmarks', error });
    }
  };


  // Delete a bookmark
exports.deleteBookmark = async (req, res) => {
  const { bookmarkId } = req.params; // The ID of the bookmark to be deleted

  try {
      // Find and delete the bookmark
      const deletedBookmark = await Bookmark.findOneAndDelete({
          _id: bookmarkId,
          userId: req.user.id, // Ensure the bookmark belongs to the logged-in user
      });

      if (!deletedBookmark) {
          return res.status(404).json({ message: 'Bookmark not found' });
      }

      res.status(200).json({ message: 'Bookmark deleted successfully', deletedBookmark });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting bookmark', error });
  }
};
