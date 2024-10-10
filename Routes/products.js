const express = require('express');
const router = express.Router();
const { createProduct, getProducts, deleteProduct } = require('../Controllers/productsController');


router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProducts);
router.delete('/', deleteProduct)

module.exports = router;
