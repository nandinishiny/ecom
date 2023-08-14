import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
const productSlice = createSlice({
    name: "product",
    initialState: {
      items: JSON.parse(localStorage.getItem("cartItems")) || [],
    },
    reducers: {
      addItem: (state, action) => {
        const newItem = { ...action.payload, _id: uuidv4() };
        state.items.push(newItem);
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // Update local storage
      },
      removeItem: (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // Update local storage
      },
      clearCart: (state, action) => {
        state.items = [];
        localStorage.removeItem("cartItems"); // Clear local storage
      },
    },
  });
  
  export const { addItem, removeItem, clearCart } = productSlice.actions;
  export default productSlice.reducer;
  