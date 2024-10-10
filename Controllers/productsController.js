const Product = require('../models/product');

const createProduct = async (req, res) => {
    const { imageUrl, name, description, author } = req.body;

    // Kerakli ma'lumotlar yo'qligini tekshirish
    if (!imageUrl || !name || !description || !author) {
        console.error('Kerakli ma\'lumotlar yetishmayapti');
        return res.status(400).json({ message: 'Bad Request: Ma\'lumot yetarli emas' });
    }

    try {
        // Yangi mahsulot yaratish va comments maydonini bo'sh massiv bilan kiritish
        const newProduct = new Product({
            imageUrl,
            name,
            description,
            author,
            comments: [] // Bo'sh comments maydoni qo'shish
        });

        await newProduct.save();

        // Muvaffaqiyatli yaratilgan mahsulotni qaytarish
        res.status(201).json({ message: 'Mahsulot muvaffaqiyatli yaratildi', data: newProduct });
    } catch (err) {
        console.error('Server xatosi:', err); // Xatoni konsolga chiqarish
        res.status(500).json({ message: 'Server xatosi' });
    }
};


const getComments = async (req, res) => {
    const { id } = req.params;

    try {
        // Mahsulotni ID bo‘yicha topish
        const product = await Product.findById(id);

        // Agar mahsulot topilmasa, xatolik xabarini qaytarish
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        // Mahsulotning izohlarini qaytarish
        res.status(200).json({ comments: product.comments });
    } catch (err) {
        console.error('Server xatosi:', err); // Xatoni konsolga chiqarish
        res.status(500).json({ message: 'Server xatosi' });
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

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        res.json({ data: product });
    } catch (err) {
        console.error(err); // Xatoni konsolga chiqarish
        res.status(500).json({ message: 'Server xatosi' });
    }
};



const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: `Product with id ${id} deleted successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createComment = async (req, res) => {
    const { id } = req.params;
    const { author, text } = req.body;

    // Agar author yoki text yo'q bo'lsa, xatolikni qaytarish
    if (!author || !text) {
        return res.status(400).json({ message: 'Bad Request: Ma\'lumot yetarli emas' });
    }

    try {
        // Mahsulotni ID bo'yicha topish
        const product = await Product.findById(id);

        // Agar mahsulot topilmasa, xatolikni qaytarish
        if (!product) {
            return res.status(404).json({ message: 'Mahsulot topilmadi' });
        }

        // Komment qo'shish
        const comment = { author, text };
        product.comments.push(comment);

        // O'zgarishni saqlash
        await product.save();

        // Yangi comment bilan mahsulotni qaytarish
        res.status(201).json({ message: 'Izoh qo\'shildi', data: product });
    } catch (err) {
        console.error(err); // Xatoni konsolga chiqarish
        res.status(500).json({ message: 'Server xatosi' });
    }
};


module.exports = { createProduct, getProducts, deleteProduct, getProductById, createComment, getComments };
