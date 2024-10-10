const express = require('express');
const router = express.Router();
const { createProduct, getProducts, deleteProduct, getProductById } = require('../Controllers/productsController');


router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/', deleteProduct)

module.exports = router;
