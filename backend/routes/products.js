const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, createProduct);

module.exports = router;
