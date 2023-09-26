const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./database/connection');

const bookRouter = require('./router/bookRouter');
const transactionRouter = require('./router/transactionRouter');

const app = express();


app.use(express.json()); // Middleware untuk parsing JSON requests
app.use('/books', bookRouter); // Menggunakan bookRouter untuk endpoint '/books'
app.use('/transactions', transactionRouter); // Menggunakan transactionRouter untuk endpoint '/transactions'


dotenv.config()
const PORT = process.env.port || 8000;

connectDB();

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });