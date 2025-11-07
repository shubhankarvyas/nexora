import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';

const API_BASE = 'http://localhost:8000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_BASE}/cart`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(`${API_BASE}/cart`, { productId, quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${API_BASE}/cart/${productId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await axios.put(`${API_BASE}/cart/${productId}`, { quantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleCheckout = async (customerData) => {
    try {
      const response = await axios.post(`${API_BASE}/checkout`, customerData);
      setReceipt(response.data);
      setCart({ items: [], total: 0 });
      setShowCheckout(false);
      setShowCart(false);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Vibe Commerce</h1>
        <button 
          className="cart-button"
          onClick={() => setShowCart(!showCart)}
        >
          Cart ({cart.items.length})
        </button>
      </header>

      <main className="main-content">
        {!showCart ? (
          <ProductGrid products={products} onAddToCart={addToCart} />
        ) : (
          <Cart 
            cart={cart}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateCartItem}
            onCheckout={() => setShowCheckout(true)}
            onBackToProducts={() => setShowCart(false)}
          />
        )}
      </main>

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onSubmit={handleCheckout}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {receipt && (
        <div className="receipt-modal">
          <div className="receipt-content">
            <h2>Order Confirmed!</h2>
            <p><strong>Order ID:</strong> {receipt.id}</p>
            <p><strong>Customer:</strong> {receipt.customerName}</p>
            <p><strong>Email:</strong> {receipt.customerEmail}</p>
            <p><strong>Total:</strong> ${receipt.total.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
            <button onClick={() => setReceipt(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
