import {configureStore} from '@reduxjs/toolkit';
import productSlice from './productSlice';
import productDisplaySlice from './productDisplaySlice';
import likedSlice from './likedSlice';


const store = configureStore({
    reducer:{
        product:productSlice,
        productDisplay:productDisplaySlice,
        liked:likedSlice,
    }

});

export default store;