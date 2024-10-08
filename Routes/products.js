const express = require('express');
const router = express.Router();
const { createProduct, getProducts } = require('../Controllers/productsController');


router.post('/', createProduct);
router.get('/', getProducts);


module.exports = router;
