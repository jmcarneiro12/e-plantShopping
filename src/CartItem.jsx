import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cart) => {
    // Initialize a variable total to hold the cumulative sum
    let total = 0;
    
    // Iterate over the cart array using cart.forEach()
    cart.forEach((item) => {
      // For each item, extract its quantity and cost
      const { quantity, cost } = item;
      
      // Convert the cost string (e.g., "$10.00") to a number using parseFloat(item.cost.substring(1))
      // then multiply it by the quantity
      const numericCost = parseFloat(cost.substring(1));
      const itemTotal = numericCost * quantity;
      
      // Add the resulting value to total
      total += itemTotal;
    });
    
    // After processing all items, return the final total sum
    return total;
  };

  const handleContinueShopping = (e) => {
    // Call the onContinueShopping function passed from the parent component
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    // Dispatch the updateQuantity action to increase the item's quantity by 1
    dispatch(updateQuantity({ 
      name: item.name, 
      quantity: item.quantity + 1 
    }));
  };

  const handleDecrement = (item) => {
    // Check if the item's quantity is greater than 1
    if (item.quantity > 1) {
      // If quantity > 1, dispatch updateQuantity to decrease the quantity by 1
      dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity - 1 
      }));
    } else {
      // If quantity would drop to 0, dispatch the removeItem action to remove the plant from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // Dispatch the removeItem action to delete the item from the cart
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
        // Extract the numeric value from the item's cost string using parseFloat(item.cost.substring(1))
        const numericCost = parseFloat(item.cost.substring(1));
        
        // Calculate the total cost for an item by multiplying its quantity with its unit price
        const totalCost = numericCost * item.quantity;
        
        return totalCost;
    };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


