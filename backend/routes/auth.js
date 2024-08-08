const express = require('express');
const router = express.Router();
const { register, login, getMe} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
