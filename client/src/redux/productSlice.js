import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
//this is actually a cart slice.

const productSlice = createSlice({
    name:"product",
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state,action)=>{
            const newItem = { ...action.payload, _id: uuidv4() };
            state.items.push(newItem)
        },
        removeItem:(state,action)=>{
            state.items= state.items.filter((item)=>(item._id!==action.payload))
        },
        clearCart:(state,action)=>{
            state.items = []
        }
    }
});
export const {addItem,removeItem,clearCart} = productSlice.actions;
export default productSlice.reducer;
            