const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController'); // Asumsikan path relatif ini sesuai dengan struktur direktori Anda

// Mendapatkan semua buku
router.get('/', bookController.getAllBooks);

// Menambahkan buku baru
router.post('/', bookController.addBook);

// Menghapus buku berdasarkan idBuku
router.delete('/:idBuku', bookController.deleteBook);

// Update buku
router.put('/:idBuku', bookController.updateBook);

module.exports = router;
