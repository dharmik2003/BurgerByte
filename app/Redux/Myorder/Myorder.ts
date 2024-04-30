import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BurgerItem {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
}

export interface OrderState {
    myorders: BurgerItem[];
}

const initialState: OrderState = {
    myorders: [],
};

export const myorderSlice = createSlice({
    name: 'myorder',
    initialState,
    reducers: {
        addmyOrder(state, action: PayloadAction<BurgerItem>) {
            state.myorders.unshift(action.payload);
            console.log("myorders", state.myorders);
        }, 
        resetmyOrders(state) {
            state.myorders = [];
        },
        
    },
});

export const { addmyOrder, resetmyOrders } = myorderSlice.actions;
export default myorderSlice.reducer;
