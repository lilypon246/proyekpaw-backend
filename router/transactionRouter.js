const express = require('express');
const router = express.Router();

const transactionController = require('../controller/transactionController');

//membuat transaksi
router.post('/', transactionController.createTransaction);

//mendapatkan semua transaksi
router.get('/', transactionController.getAllTransactions);

//update transaksi
router.put('/:id', transactionController.updateTransaction);

//menghapus transaksi
router.delete('/:id', transactionController.deleteTransaction)

module.exports = router;
