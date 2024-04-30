/*order id generate unique */
import { nanoid } from 'nanoid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BurgerItem {
    orderId: string;
}

export interface OrderState {
    orderID: string;
}

const initialState: OrderState = {
    orderID: '',
};

export const orderIDSlice = createSlice({
    name: 'orderID',
    initialState,
    reducers: {
        setaddorderID(state,action){
            state.orderID =action.payload
        },
        setresetOrderID(state) {
            state.orderID = '';
        },
    },
});


export const { setaddorderID, setresetOrderID } = orderIDSlice.actions;

export default orderIDSlice.reducer;