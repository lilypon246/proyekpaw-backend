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
    getAllTransactions : async (req, res) => {
        try {
            const transactions = await Transaction.find({});
    
            // Dapatkan semua bookID dari semua transaksi
            const bookIDs = [];
            transactions.forEach(transaction => {
                transaction.books.forEach(book => {
                    if (!bookIDs.includes(book.bookID)) {
                        bookIDs.push(book.bookID);
                    }
                });
            });
    
            // Dapatkan judul buku dari semua bookID yang unik
            const books = await Book.find({ bookID: { $in: bookIDs } });
    
            // Map judul buku ke setiap transaksi
            const mappedTransactions = transactions.map(transaction => {
                const mappedBooks = transaction.books.map(book => {
                    const matchedBook = books.find(b => b.bookID === book.bookID);
                    return {
                        ...book._doc,
                        title: matchedBook ? matchedBook.title : "Unknown"
                    };
                });
                return {
                    ...transaction._doc,
                    books: mappedBooks
                };
            });
    
            res.status(200).json(mappedTransactions);
        } catch (err) {
            return res.status(500).json({ message: 'Error retrieving transactions', error: err });
        }
    },
    //delete transaction by id
    deleteTransaction: async (req, res) => {
        try {
            const { transactionId } = req.params; 
            const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
            if (!deletedTransaction) return res.status(404).json({ message: "Transaction not found" });
            res.status(200).json(deletedTransaction);
        } 
        catch (error) {
            res.status(500).json({ message: "Server Error", error });
        }
    },
};

module.exports = transactionController;
