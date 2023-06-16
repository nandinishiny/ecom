import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const likedSlice = createSlice({
    name:"liked",
    initialState:{
        items:[]
    },
    reducers:{
        addToLiked:(state,action)=>{
            const newItem = { ...action.payload, _id: uuidv4() };
            state.items.push(newItem);
        },
        removeFromLiked:(state,action)=>{
            state.items = state.items.filter((item)=>item._id!==action.payload)
        },
        clearLiked:(state)=>{
            state.items=[]
        }
    }
})

export const {addToLiked,removeFromLiked,clearLiked}=likedSlice.actions;
export default likedSlice.reducer;