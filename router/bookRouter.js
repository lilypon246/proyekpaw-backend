const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController'); // Asumsikan path relatif ini sesuai dengan struktur direktori Anda

// Mendapatkan semua buku
router.get('/', bookController.getAllBooks);

// Menghapus buku berdasarkan idBuku
router.delete('/:idBuku', bookController.deleteBook);

// Update buku
router.put('/:idBuku', bookController.updateBook);

// Sort by genre
router.get('/sort/genre', bookController.getAllBooksSortedByGenre);
module.exports = router;
