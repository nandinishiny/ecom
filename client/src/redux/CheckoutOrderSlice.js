import { createSlice } from "@reduxjs/toolkit";

const CheckoutOrderSlice = createSlice({
    name: "checkout",
    initialState: {
        items:[]
    },
    reducers: {
        addToCheckOut: (state, action) => {
            state.items = action.payload;
            localStorage.setItem('checkoutDetails', JSON.stringify(action.payload));
        },
        emptyCheckout: (state, action) => {
            state.items = []   
        },
        
    },
});

export const { addToCheckOut,emptyCheckout} = CheckoutOrderSlice.actions;

export default CheckoutOrderSlice.reducer;
