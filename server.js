// server.js or index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./Routes/products');
const userRoutes = require('./Routes/usersRouter');

const ApiUrl = express();

connectDB();

ApiUrl.use(cors());
ApiUrl.use(express.json());
ApiUrl.use('/products', productRoutes); // Endpoint for products
ApiUrl.use('/users', userRoutes); // Endpoint for users

ApiUrl.listen(5001, () => {
    console.log('Your API is running on port 5001');
});
