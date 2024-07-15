const Book = require('../models/book');
const Review = require('../models/review');
const Customer = require('../models/customer');
const { emitNewBookAdded } = require('../services/socketService');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();

    emitNewBookAdded(book);

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewsByBookId = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.id }).populate('customerId');
    if (!reviews) return res.status(404).json({ message: 'Reviews not found' });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
