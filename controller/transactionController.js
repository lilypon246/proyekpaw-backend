const Transaction = require('../models/transactionModel');
const Book = require('../models/bookModel');

const transactionController = {
    createTransaction: async (req, res) => {
        try {
            const { idTransaction, books, employeeID } = req.body;

            let totalPrice = 0;

            for (let i = 0; i < books.length; i++) {
                const book = await Book.findOne({ bookID: books[i].bookID });  // Cari buku berdasarkan bookID
                if (!book) {
                    return res.status(400).json({ success: false, message: `Book with ID ${books[i].bookID} not found` });
                }
                totalPrice += book.price * books[i].quantity;
            }
            

            const transaction = new Transaction({
                idTransaction,
                books,
                totalPrice,
                employeeID
            });

            await transaction.save();
            res.status(201).json({ success: true, data: transaction });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
};

module.exports = transactionController;