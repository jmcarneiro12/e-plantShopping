import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize the items array to hold cart items
  },
  reducers: {
    // Add item to cart
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Remove item from cart
    removeItem: (state, action) => {
      // Remove item from cart based on its name
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // Update quantity of an item in cart
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload; // Extract the item's name and quantity from the action payload
      
      // Find the item in the state.items array that matches the extracted name
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        // If the item is found, update its quantity to the new amount provided in the payload
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export the action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer
export default CartSlice.reducer;