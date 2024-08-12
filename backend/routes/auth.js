const express = require('express');
const router = express.Router();
const { register, login, getAllUsers,deleteUser, updateUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);
router.get('/users', authMiddleware, getAllUsers);
router.delete('/users/:id', authMiddleware, deleteUser);
router.put('/users/:id', authMiddleware, updateUser);

module.exports = router;
