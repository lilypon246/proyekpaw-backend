const mongoose = require('mongoose')

// Subdocument schema untuk merekam detail buku dalam transaksi
const bookSchema = new mongoose.Schema({
    bookID: {
        type: String,
        ref: 'Book' // Mengacu pada model 'Book' berdasarkan 'bookID'
    },
    quantity: {
        type: Number,
        required: true
    }
});

const transactionSchema = new mongoose.Schema({
    idTransaction: {
        type: String,
        required: true
    },
    books: [bookSchema], // Menggunakan array untuk merekam detail buku
    totalPrice: {
        type: Number,
        required: true
    },
    employeeID: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);