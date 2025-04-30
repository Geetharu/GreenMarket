import React from 'react';
import Swal from 'sweetalert2';
import './Cart.css';

function Cart({ cart, setCart }) {
  const removeFromCart = (indexToRemove) => {
    Swal.fire({
      title: 'Remove this item?',
      text: 'It will be removed from your cart.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53935',
      cancelButtonColor: '#9e9e9e',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
        Swal.fire('Removed!', 'Item has been removed.', 'success');
      }
    });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="empty-msg">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>Rs. {item.price}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(index)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-total">
          <strong>Total: Rs. {totalPrice}</strong>
        </div>
      )}
    </div>
  );
}

export default Cart;
