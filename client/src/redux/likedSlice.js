import { createSlice } from "@reduxjs/toolkit";

const likedSlice = createSlice({
    name: "liked",
    initialState: {
        items: JSON.parse(localStorage.getItem("likedItems")) || [],
    },
    reducers: {
        addToLiked: (state, action) => {
            // if(state.items.)
            // const newItem = { ...action.payload };
            // state.items.push(newItem);
            // localStorage.setItem("likedItems", JSON.stringify(state.items));
             // Update local storage
             const newItem = action.payload;
    
            // Check if the item already exists in the array
            const existingItem = state.items.find(item => item._id === newItem._id);
            
            if (!existingItem) {
                state.items.push(newItem);
                localStorage.setItem("likedItems", JSON.stringify(state.items)); // Update local storage
            }
        },
        removeFromLiked: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload);
            localStorage.setItem("likedItems", JSON.stringify(state.items)); // Update local storage
        },
        clearLiked: (state) => {
            state.items = [];
            localStorage.removeItem("likedItems"); // Clear local storage
        },
    },
});

export const { addToLiked, removeFromLiked, clearLiked } = likedSlice.actions;

export default likedSlice.reducer;
