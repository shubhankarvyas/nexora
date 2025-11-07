const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST /api/checkout - Process checkout
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const cart = await Cart.findOne({ userId: 'mock-user' });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Create mock receipt
    const receipt = {
      id: `ORDER-${Date.now()}`,
      customerName: name,
      customerEmail: email,
      items: cart.items,
      total: cart.total,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    // Clear cart after successful checkout
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;