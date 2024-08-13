const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrdersByUserId, getOrdersByEmail } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/user-orders',authMiddleware, getOrdersByUserId);
router.get('/:email', authMiddleware ,getOrdersByEmail);

module.exports = router;
