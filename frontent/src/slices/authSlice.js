import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
axios.defaults.baseURL =process.env.React_App_BASE_URL



const userVerifier=createAsyncThunk("authuser/userVerifier",async()=>{
   
    const data=await axios.get("/api/user/verify").then(res=>{
           console.log(res.data)
    return res.data
     })
 
    
 
     return data
 
 
 })
 
 
 const userLogout=createAsyncThunk("userLogout",async()=>{
     await axios.get("/api/user/logout").then(res=>{
        // console.log(res.data.status)
        //  if(res.data.status==='failed'){
        //     userVerifier()
        //  }


        return res.data.status
    })

 })

const Authuser=createSlice({
    name:"authuser",
    initialState:{
      userName:null,
      status:null

    },
    extraReducers:(builder)=>{
     
        builder.addCase(userVerifier.pending,(state)=>{

        })
        builder.addCase(userVerifier.fulfilled,(state,{payload})=>{
            state.status=payload.status;
            state.userName=payload.userName;

            
        })
        builder.addCase(userVerifier.rejected,(state)=>{
            
        })
        builder.addCase(userLogout.fulfilled,(state,{payload})=>{
            state.status=payload

            userVerifier();

        })
     

        

    }


}
)


export {userVerifier}
export {userLogout}


export default Authuser.reducer