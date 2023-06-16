import { createSlice } from "@reduxjs/toolkit";

const productDisplaySlice = createSlice({
    name:"productDisplay",
    initialState:{
        items:[]
    },
    reducers:{
        displayProducts:(state,action)=>{
            state.items = action.payload;
        }
    }

});

export const {displayProducts} = productDisplaySlice.actions;
export default productDisplaySlice.reducer;