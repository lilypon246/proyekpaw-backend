const Book = require('../models/bookModel'); // Asumsikan path relatif ini sesuai dengan struktur direktori Anda

const bookController = {

    //Membuat data buku
    addBook: async (req, res) => {
        try {
            // Extract book data from the request body
            const { bookID, title, isbn, price, year, publisher, genre } = req.body;

            // Create a new book document
            const newBook = await Book.create({
                bookID,
                title,
                isbn,
                price,
                year,
                publisher,
                genre,
            });

            res.status(201).json(newBook); // Respond with the newly created book
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error', error });
        }
    },

    // Mendapatkan semua buku
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: "Server Error", error });
        }
    },
     // Mendapatkan buku berdasarkan bookID
     getBookById: async (req, res) => {
        try {
            const idBuku = req.params.idBuku;
            const book = await Book.findOne({ bookID: idBuku });
    
            if (!book) {
                return res.status(404).json({ success: false, message: "Book not found" });
            }
    
            res.status(200).json({ success: true, data: book });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

      // Sort by genre
      getAllBooksSortedByGenre: async (req, res) => {
        try {
            const books = await Book.find().sort({ genre: 1 }); // Mengurutkan berdasarkan genre secara ascending (A-Z)
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: "Server Error", error });
        }
    },
    // Update buku by ID
    updateBook: async (req, res) => {
        const { idBuku } = req.params;
        const updatedBookData = req.body;

        try {
            const updatedBook = await Book.findByIdAndUpdate(idBuku, updatedBookData, { new: true });

            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.json(updatedBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    // Menghapus satu buku
    deleteBook: async (req, res) => {
        try {
            const id = req.params.idBuku;
            const book = await Book.findOneAndDelete({ bookID: id });
            if(!book) return res.status(404).json({ message: "Book not found" }); 
            res.status(200).json(book);
        }
        catch (error) {
            res.status(500).json({ message: "Server Error", error });
        }
    },
};

module.exports = bookController;
