import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: {searchingOrders: [], totalItems: 0},
        order: null
    },
    reducers: {
        setOrders: (state, action) => {
            const { searchingOrders, totalItems} = action.payload;
            state.orders = { searchingOrders: [...searchingOrders], totalItems };
        },
        addOrder: (state, action) => {
            state.orders = [action.payload, ...state.orders];
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