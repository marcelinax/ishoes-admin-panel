import { createSlice } from '@reduxjs/toolkit';

export const shoeProductsSlice = createSlice({
    name: 'shoeProducts',
    initialState: {
        shoeProducts: []
    },
    reducers: {
        setShoeProducts: (state, action) => {
            state.shoeProducts = [...action.payload];
        }
    }
});

export const { setShoeProducts } = shoeProductsSlice.actions;

export default shoeProductsSlice.reducer;