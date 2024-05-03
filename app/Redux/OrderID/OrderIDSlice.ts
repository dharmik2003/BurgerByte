/*order id generate unique */
import { nanoid } from 'nanoid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BurgerItem {
    orderId: string;
}

export interface OrderState {
    orderID: string;
    paymentID:string
}

const initialState: OrderState = {
    orderID: '',
    paymentID:''
    
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
        setresetpaymentid(state) {
            state.paymentID = '';
        },
        addpaymentid(state, action) {
            state.paymentID = action.payload
        },
    },
});


export const { setaddorderID, setresetpaymentid, addpaymentid, setresetOrderID } = orderIDSlice.actions;

export default orderIDSlice.reducer;