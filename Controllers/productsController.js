const Product = require('../models/product');

const createProduct = async (req, res) => {
    const { imageUrl, name, description, author } = req.body;

    if (!imageUrl || !name || !description || !author) {
        return res.status(400).json({ message: 'Bad Request: Missing data' });
    }

    try {
        const newProduct = new Product({ imageUrl, name, description, author }); // Authorni qo'shish
        await newProduct.save();
        res.status(201).json({ data: newProduct }); // 201 status kodi
    } catch (err) {
        console.error(err); // Xatoni konsolga chiqarish
        res.status(500).json({ message: 'Server Error' });
    }
};


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ data: products });
    } catch (err) {
        console.error(err); // Xatoni konsolga chiqarish
        res.status(500).json({ message: 'Server Error' });
    }
};


module.exports = { createProduct, getProducts };
