// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface BurgerItem {
//     id: number;
//     image: string;
//     name: string;
//     price: number;
//     quantity: number;
// }

// export interface OrderState {
//     orderid:string
//     orders: BurgerItem[];
// }

// const initialState: OrderState = {
//     orderid:'',
//     orders:[],
// };

// export const orderSlice = createSlice({
//     name: 'order',
//     initialState,
//     reducers: {
        // addOrder(state, action) {
        //     const existingIndex = state.orders.findIndex(order => order.id === action.payload.id);
        //     if (existingIndex !== -1) {
        //         state.orders[existingIndex].quantity += 1;
        //     } else {
        //         state.orders.push(action.payload);
        //     }
        // },
//         resetOrders(state) {
//             state.orderid = '';
//             state.orders = [];
//         },
//         updateOrders(state, action) {
//             state.orders = action.payload;
//         },
//     },
// });

// export const { addOrder, resetOrders, updateOrders } = orderSlice.actions;

// export default orderSlice.reducer;


/*order id generate unique */
import { nanoid } from 'nanoid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BurgerItem {
    id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    orderId: string;
}

export interface OrderState {
    orderid: string;
    orders: BurgerItem[];
}

const initialState: OrderState = {
    orderid: '',
    orders: [],
};

const generateUniqueOrderId = (existingIds: string[]): string => {
    let newId = nanoid();
    while (existingIds.includes(newId)) {
        newId = nanoid();
    }
    return newId;
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder(state, action: PayloadAction<BurgerItem>) {
            const existingIndex = state.orders.findIndex(order => order.id === action.payload.id);
            if (existingIndex !== -1) {
                state.orders[existingIndex].quantity += 1;
            }
                // } else {
            //     // Generate unique order ID
            //     const orderId = generateUniqueOrderId(state.orders.map(order => order.orderId)); // Change order => order.orderId
            //     state.orders.push({ ...action.payload, orderId });
            // }
             else {
                        state.orders.push(action.payload);
                    }
        },
        addorderid(state,action){
            state.orderid=action.payload
        },
        
        resetOrders(state) {
            state.orderid = '';
            state.orders = [];
        },
        updateOrders(state, action: PayloadAction<BurgerItem[]>) {
            state.orders = action.payload;
        },
    },
});


export const { addOrder, addorderid, resetOrders, updateOrders } = orderSlice.actions;

export default orderSlice.reducer;