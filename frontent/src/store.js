import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import cartDetailSlice from "./slices/cartDetailSlice";
import dealsSlice from "./slices/dealsSlice";
import authSlice from "./slices/authSlice";
import searchDataSlice from "./slices/searchDataSlice";
import userAddressSlice from "./slices/userAddressSlice";
import checkoutSlice from "./slices/checkoutSlice";
import otpSlice from "./slices/otpSlice";
// import userAddressSlice from "./slices/userAddressSlice";


const store=configureStore({
    reducer:{
        cartUser:cartSlice,
        cartDetail:cartDetailSlice,
        todaydeal:dealsSlice,
    authuser:authSlice,
    searchData:searchDataSlice,
    addresses:userAddressSlice,
    checkoutData:checkoutSlice,
    otpFeatures:otpSlice
   

    },
})

export {store};