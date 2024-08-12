const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);

module.exports = router;
