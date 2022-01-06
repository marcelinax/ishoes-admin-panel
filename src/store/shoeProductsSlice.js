import { createSlice } from '@reduxjs/toolkit';

export const shoeProductsSlice = createSlice({
    name: 'shoeProducts',
    initialState: {
        shoeProducts: []
    },
    reducers: {
        setShoeProducts: (state, action) => {
            state.shoeProducts = [...action.payload];
        },
        addShoeProduct: (state, action) => {
            state.shoeProducts = [...state.shoeProducts, action.payload];
        },
        deleteShoeProduct: (state, action) => {
            const id = action.payload;
            const shoeProductIndex = state.shoeProducts.map(shoeProduct => {return shoeProduct._id;}).indexOf(id);
            state.shoeProducts.splice(shoeProductIndex, 1);
            state.shoeProducts = [...state.shoeProducts];
        }
    }
});

export const { setShoeProducts,addShoeProduct,deleteShoeProduct } = shoeProductsSlice.actions;

export default shoeProductsSlice.reducer;