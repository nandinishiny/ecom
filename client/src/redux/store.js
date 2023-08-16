import {configureStore} from '@reduxjs/toolkit';
import productSlice from './productSlice';
import productDisplaySlice from './productDisplaySlice';
import likedSlice from './likedSlice';
import CheckoutOrderSlice from './CheckoutOrderSlice';


const store = configureStore({
    reducer:{
        product:productSlice,
        productDisplay:productDisplaySlice,
        liked:likedSlice,
        checkout:CheckoutOrderSlice
    }

});

export default store;