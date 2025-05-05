const express = require('express');
const router = express.Router();
const Order = require('../Model/OrderModel');

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { user, items, total } = req.body;
    if (!user || !items || !total) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const order = new Order({ user, items, total });
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 