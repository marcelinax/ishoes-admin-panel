import brandsSlice from './brandsSlice';
import { configureStore } from '@reduxjs/toolkit';
import ordersSlice from './ordersSlice';
import shoeProductsSlice from './shoeProductsSlice';

export default configureStore({
    reducer: {
        shoeProducts: shoeProductsSlice,
        brands: brandsSlice,
        orders: ordersSlice
    },
});