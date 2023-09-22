const express = require('express');
const router = express.Router();

const transactionController = require('../controller/transactionController');

//membuat transaksi
router.post('/', transactionController.createTransaction);

//mendapatkan semua transaksi
router.get('/', transactionController.getAllTransactions);


module.exports = router;