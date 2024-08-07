const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  try {
    const order = new Order({
      user: req.userId,
      products,
      totalAmount,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
