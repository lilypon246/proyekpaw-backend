const Book = require('../models/bookModel');

const bookController = {

    addBook: async (req, res, next) => {
        try {
            const { bookID, title, isbn, price, year, publisher, genre } = req.body;

            const newBook = await Book.create({
                bookID,
                title,
                isbn,
                price,
                year,
                publisher,
                genre,
            });

            res.status(201).json(newBook);
        } catch (error) {
            next(error);  // Menggantikan bagian error handling dengan next(error)
        }
    },

    getAllBooks: async (req, res, next) => {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    },

    getBookById: async (req, res, next) => {
        try {
            const idBuku = req.params.idBuku;
            const book = await Book.findOne({ bookID: idBuku });
    
            if (!book) {
                return res.status(404).json({ success: false, message: "Book not found" });
            }
    
            res.status(200).json({ success: true, data: book });
        } catch (error) {
            next(error);
        }
    },

    getAllBooksSortedByGenre: async (req, res, next) => {
        try {
            const books = await Book.find().sort({ genre: 1 });
            res.status(200).json(books);
        } catch (error) {
            next(error);
        }
    },

    updateBook: async (req, res, next) => {
        const { idBuku } = req.params;
        const updatedBookData = req.body;

        try {
            const updatedBook = await Book.findByIdAndUpdate(idBuku, updatedBookData, { new: true });

            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.json(updatedBook);
        } catch (error) {
            next(error);
        }
    },

    deleteBook: async (req, res, next) => {
        try {
            const id = req.params.idBuku;
            const book = await Book.findOneAndDelete({ bookID: id });
            if(!book) return res.status(404).json({ message: "Book not found" }); 
            res.status(200).json(book);
        }
        catch (error) {
            next(error);
        }
    },
};

module.exports = bookController;
