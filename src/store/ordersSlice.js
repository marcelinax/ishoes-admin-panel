import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        order: {}
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = [...action.payload];
        },
        addOrder: (state, action) => {
            state.orders = [...state.orders, action.payload];
        },
        setOrder: (state, action) => {
            state.order = action.payload;
        }
    }
});

export const {setOrders,addOrder,setOrder } = ordersSlice.actions;
export default ordersSlice.reducer;