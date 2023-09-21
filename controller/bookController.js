const Book = require('../models/bookModel'); // Asumsikan path relatif ini sesuai dengan struktur direktori Anda

const bookController = {

    // Mendapatkan semua buku
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: "Server Error", error });
        }
    },

    // Menghapus satu buku
    deleteBook: async (req, res) => {
        try {
            const id = req.params.bookID
            const book = await Book.findOneAndDelete(id)
            res.status(200).json(book);
        }
        catch(error) {
            res.status(500).json({message: "Server Error", error})
        }
    }
};

module.exports = bookController;
