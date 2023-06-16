import {configureStore} from '@reduxjs/toolkit';
import productSlice from './productSlice';
import productDisplaySlice from './productDisplaySlice';
import likedSlice from './likedSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer:{
        product:productSlice,
        productDisplay:productDisplaySlice,
        liked:likedSlice,
        user:userSlice
    }

});

export default store;