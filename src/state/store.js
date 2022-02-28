import { configureStore } from '@reduxjs/toolkit';
import brandsSlice from '@state/brands/brandsSlice';
import ordersSlice from '@state/orders/ordersSlice';
import shoeProductsSlice from '@state/shoe-products/shoeProductsSlice';

export default configureStore({
    reducer: {
        shoeProducts: shoeProductsSlice,
        brands: brandsSlice,
        orders: ordersSlice
    },
});