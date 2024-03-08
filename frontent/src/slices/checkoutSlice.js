import { createSlice } from "@reduxjs/toolkit";

const  checkoutSlice=createSlice({
    name:"checkoutData",
    initialState:{
        data:null,
        loading:false,
        error:null
    },
    reducers:{
         addCheckoutData(state,{payload}){
            state.data=payload;
            // state.data.push(payload);


            return state
            


        }

    },
})


export default checkoutSlice.reducer
export const {addCheckoutData}=checkoutSlice.actions