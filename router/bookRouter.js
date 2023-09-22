const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController'); // Asumsikan path relatif ini sesuai dengan struktur direktori Anda

//menambahkan buku
router.post('/', bookController.addBook);

// Mendapatkan semua buku
router.get('/', bookController.getAllBooks);

// Sort by genre
router.get('/sort/genre', bookController.getAllBooksSortedByGenre);

// Mendapatkan buku berdasarkan bookID
router.get('/:idBuku', bookController.getBookById);

// Menghapus buku berdasarkan idBuku
router.delete('/:idBuku', bookController.deleteBook);

// Update buku
router.put('/:idBuku', bookController.updateBook);

module.exports = router;
