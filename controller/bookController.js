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
};

module.exports = bookController;
