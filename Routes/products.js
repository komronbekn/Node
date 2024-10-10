const express = require('express');
const router = express.Router();
const { createProduct, getProducts, deleteProduct, getProductById, createComment, getComments } = require('../Controllers/productsController');


router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.delete('/:id', deleteProduct)
router.post('/:id/comments', createComment)
router.get('/:id/comments', getComments)
module.exports = router;
