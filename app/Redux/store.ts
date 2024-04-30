// import { authSlice } from './User/User';
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//     userdata:authSlice
// });

// const persistConfig = {
//     key: "root",
//     storage,
// };

// const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export default store;



/* */

// import { authSlice } from './User/User';
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const rootReducer = combineReducers({
//     userdata: authSlice,
// });

// const persistConfig = {
//     key: "root",
//     storage,
// };

// const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export default store;






/* without persist work*/


// import { configureStore } from '@reduxjs/toolkit';
// import authSlice  from './User/User';
// import OrderSlice from './Order/OrderSlice';

// const store = configureStore({
//     reducer: {
//         auth: authSlice,
//         orderdata:OrderSlice
//     },
// });

// export default store;


/*with persist work */

import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authSlice from './User/User';
import OrderSlice from './Order/OrderSlice';
import  myorderSlice  from './Myorder/Myorder';
import orderIDSlice  from './OrderID/OrderIDSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const orderPersistConfig = {
    key: 'orderdata',
    storage,
};
const orderIDPersistConfig = {
    key: 'orderID',
    storage,
};
const myorderdataConfig = {
    key: 'myorderdata',
    storage,
};


const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);
const persistedOrderReducer = persistReducer(orderPersistConfig, OrderSlice);
const persistedmyorderdataConfig = persistReducer(myorderdataConfig, myorderSlice);
const persistedorderIDdataConfig = persistReducer(orderIDPersistConfig, orderIDSlice);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        orderdata: persistedOrderReducer,
        myorderdata: persistedmyorderdataConfig,
        orderID: persistedorderIDdataConfig,
    },
});

export const persistor = persistStore(store);

export default store;
