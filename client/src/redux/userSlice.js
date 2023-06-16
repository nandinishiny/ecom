import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:{}
    },
    reducers:{
        getUser:(state,action)=>{
            state.user=action.payload;
        },
        removeUser:(state)=>{
            state.user={};
        }
    }

})
export const {getUser,removeUser}= userSlice.actions;
export default userSlice.reducer;