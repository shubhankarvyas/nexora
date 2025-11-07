import React from 'react';

const Cart = ({ cart, onRemoveItem, onUpdateQuantity, onCheckout, onBackToProducts }) => {
  if (cart.items.length === 0) {
    return (
      <div className="cart">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={onBackToProducts}>← Back to Products</button>
        </div>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={onBackToProducts}>← Back to Products</button>
      </div>
      
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.productId} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button 
                onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <button 
              className="remove-btn"
              onClick={() => onRemoveItem(item.productId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h3>Total: ${cart.total.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;