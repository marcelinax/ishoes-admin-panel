import { createSlice } from '@reduxjs/toolkit';

export const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        brands: []
    },
    reducers: {
        setBrands: (state, action) => {
            state.brands = [...action.payload];
        },
        addBrand: (state, action) => {
            state.brands = [...state.brands, action.payload];
        },
        deleteBrand: (state, action) => {
            const id = action.payload;
            const brandIndex = state.brands.map(brand => { return brand._id; }).indexOf(id);
            state.brands.splice(brandIndex, 1);
            state.brands = [...state.brands];
        }
    }
});

export const { setBrands,addBrand,deleteBrand } = brandsSlice.actions;

export default brandsSlice.reducer;