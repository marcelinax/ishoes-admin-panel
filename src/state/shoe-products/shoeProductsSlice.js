import { createSlice } from '@reduxjs/toolkit';

export const shoeProductsSlice = createSlice({
    name: 'shoeProducts',
    initialState: {
        shoeProducts: {searchingShoeProducts: [], totalItems: 0},
        shoeProduct: {}
    },
    reducers: {
        setShoeProducts: (state, action) => {
            const { searchingShoeProducts, totalItems} = action.payload;
            state.shoeProducts = {searchingShoeProducts: [...searchingShoeProducts], totalItems };
        },
        addShoeProduct: (state, action) => {
            state.shoeProducts = [action.payload, ...state.shoeProducts];
        },
        deleteShoeProduct: (state, action) => {
            const id = action.payload;
            const shoeProductIndex = state.shoeProducts.map(shoeProduct => {return shoeProduct._id;}).indexOf(id);
            state.shoeProducts.splice(shoeProductIndex, 1);
            state.shoeProducts = [...state.shoeProducts];
        },
        setShoeProduct: (state, action) => {
            state.shoeProduct = action.payload;
        }
    }
});

export const { setShoeProducts,addShoeProduct,deleteShoeProduct,setShoeProduct } = shoeProductsSlice.actions;

export default shoeProductsSlice.reducer;