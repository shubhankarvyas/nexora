const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Mock products data
const mockProducts = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://via.placeholder.com/300x200?text=Headphones', description: 'High-quality wireless headphones' },
  { id: 2, name: 'Smartphone', price: 699.99, image: 'https://via.placeholder.com/300x200?text=Smartphone', description: 'Latest model smartphone' },
  { id: 3, name: 'Laptop', price: 1299.99, image: 'https://via.placeholder.com/300x200?text=Laptop', description: 'Powerful laptop for work' },
  { id: 4, name: 'Coffee Maker', price: 149.99, image: 'https://via.placeholder.com/300x200?text=Coffee+Maker', description: 'Automatic coffee maker' },
  { id: 5, name: 'Running Shoes', price: 129.99, image: 'https://via.placeholder.com/300x200?text=Running+Shoes', description: 'Comfortable running shoes' },
  { id: 6, name: 'Backpack', price: 79.99, image: 'https://via.placeholder.com/300x200?text=Backpack', description: 'Durable travel backpack' },
  { id: 7, name: 'Tablet', price: 399.99, image: 'https://via.placeholder.com/300x200?text=Tablet', description: '10-inch tablet' },
  { id: 8, name: 'Bluetooth Speaker', price: 59.99, image: 'https://via.placeholder.com/300x200?text=Speaker', description: 'Portable bluetooth speaker' }
];

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    let products = await Product.find();
    
    // If no products in DB, seed with mock data
    if (products.length === 0) {
      await Product.insertMany(mockProducts);
      products = await Product.find();
    }
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;