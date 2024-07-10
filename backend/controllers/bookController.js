// bookController.js
import Book from "../models/Book.model.js";
import Review from "../models/Review.model.js";
// Add a new book
export const addBook = async (req, res) => {
  const { title, author, genre, description } = req.body;

  if (!title || !author || !genre || !description) {
    return res.status(400).json({ error: "Please provide all required fields" });
  }

  const newBook = new Book({ title, author, genre, description });

  try {
    await newBook.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
};

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({message:"books fetched successfully",books});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};


export const getBookReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
   
    const reviews = await Review.find({ bookId: id });
    res.status(200).json({meessage:"reviews fetched successfully!",reviews:reviews});
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

export const addBookReview = async (req, res) => {
  const { rating, comment } = req.body;
  const {id} = req.params;
  console.log("ddd",id );
  try {
    console.log("hello")
    const book = await Book.findById(id);
    console.log("hello")
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    const newReview = {
      bookId:id,
      rating,
      comment,
      createdAt: new Date()
    };

   await Review.create(newReview);

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
};