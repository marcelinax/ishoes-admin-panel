import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        order: null
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
        },
        changeOrderStatus: (state, action) => {
            const {status} = action.payload;
            state.order.status = status;
        }
    }
});

export const {setOrders,addOrder,setOrder,changeOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;