// 'use client'
// import { createSlice } from '@reduxjs/toolkit';

// // Define initial state
// const initialState = {
//     username: '',
//     useremail: '',
//     userpassword: '',
//     isLoading: false,
// };

// // Create a slice
// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setName: (state, action) => {
//             state.username = action.payload;
//         },
//         setEmail: (state, action) => {
//             state.useremail = action.payload;
//         },
//         setPassword: (state, action) => {
//             state.userpassword = action.payload;
//         },
//         setIsLoading: (state, action) => {
//             state.isLoading = action.payload;
//         },
//     },
// });

// // Export action creators
// export const { setName, setEmail, setPassword, setIsLoading } = authSlice.actions;

// // Export reducer
// export default authSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     username: '',
//     useremail: '',
//     userpassword: '',
//     userphotos:'',
//     isLogin: false,
//     admin:false,
//     address:''
// };

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setName: (state, action) => {
//             console.log("name action", action)
//             state.username = action.payload;
//         },
//         setEmail: (state, action) => {
//             state.useremail = action.payload;
//         },
//         setPassword: (state, action) => {
//             state.userpassword = action.payload;
//         },
//         setIsLogin: (state, action) => {
//             state.isLogin = action.payload;
//         },
//         setPhotos: (state, action) => {
//             state.userphotos = action.payload;
//         },
//         setadmin: (state, action) => {
//             state.admin = action.payload;
//         },
//         setaddress: (state, action) => {
//             state.address = action.payload;
//         },
//         setresetPhotos: (state) => {
//             state.userphotos = '';
//         },
//         setlogout: (state) => {
//             state.username = initialState.username;
//             state.useremail = initialState.useremail;
//             state.userpassword = initialState.userpassword;
//             state.userphotos = initialState.userphotos;
//             state.isLogin = initialState.isLogin;
//             state.admin = initialState.admin;
//             state.address = initialState.address;
//         },

//     },
// });

// export const { setName, setadmin, setaddress,setEmail, setlogout, setresetPhotos, setPassword, setPhotos, setIsLogin } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for your user data
interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  isVerified: boolean;
  admin: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  loginTime: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  loginTime: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.loginTime = new Date().toISOString();
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loginTime = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
