const express = require('express');
const router = express.Router();

const transactionController = require('../controller/transactionController');

//membuat transaksi
router.post('/', transactionController.createTransaction);


module.exports = router;