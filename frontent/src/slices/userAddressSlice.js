import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify';
axios.defaults.baseURL=process.env.React_App_BASE_URL;




const addUserAddress=createAsyncThunk("addresses/addUserAddress",async(data)=>{
    return await axios.post("/api/user/saveAddress",{data}).then(res=>{

        console.log(res.data)
        toast(res.data.message,{containerId:"cart"})

        return res.data
    })

})

const getAddress=createAsyncThunk("addresses/getAddress",async()=>{
     return  await axios.get("/api/user/getAddresses").then(res=>{
 

        return res.data.data
     })

})

const removeAddress=createAsyncThunk("removeAddress",async(id)=>{
    console.log("hello",id)
    return await axios.delete(`/api/user/removeAddress/?Aid=${id}`).then(res=>{
        console.log(res.data.status)
        toast.error(res.data.message,{containerId:"cart"})
        
        return res.data
    }).catch(error=>{
        
        return error
    })
})

const updateAddress=createAsyncThunk("updateAddress",async(data)=>{
 
    return await axios.patch("/api/user/updateAddress",{data}).then(res=>{

        if(res.data.status===true){
        toast.success(res.data.message,{containerId:"cart"})
        }else {
        toast.error(res.data.message,{containerId:"cart"})

        }
        return res.data.status
    })
})

const userAddressSlice=createSlice({
    name:"addresses",
    initialState:{
        status:null,
        error:null,
        loading:null,
        data:[],
    },
    extraReducers:(builder)=>{

// getaddress data state managing start
        // builder.addCase(getAddress.pending,(state)=>{
        //             state.loading=false
        //             // state.data=payload
        //         })
   builder.addCase(getAddress.fulfilled,(state,{payload})=>{
            state.loading=false
            state.data=payload
            state.status=true

            // console.log("hello")
        })

// getaddress data state managing end

builder.addCase(removeAddress.fulfilled,(state,{payload})=>{
  state.status=false
    // console.log("hello")


})


builder.addCase(updateAddress.fulfilled,(state,{payload})=>{
    state.status=payload
})

    }
    
})


export default userAddressSlice.reducer
export {addUserAddress,getAddress,removeAddress,updateAddress}