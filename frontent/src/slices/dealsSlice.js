import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL =process.env.React_App_BASE_URL



export const getProducts= createAsyncThunk("getProducts",async(type)=>{
   const data= await axios.get(`/api/deal?prdType=${type}`). then((result) =>{


    console.log(result.data);
       return result.data.data
         
      }).catch(err=>{
          
      })
     
   
    return data
    })
    

      
   
// console.log(` product list : ${getProducts}`)
const   dealSclice= createSlice({
    name:"todaydeal",
    initialState:{
      isLoading:false,
      data:[],
      error:false
    },
  extraReducers:(builder)=>{
    builder.addCase(getProducts.pending,(state)=>{
        state.isLoading=false
    })
    builder.addCase(getProducts.fulfilled,(state,action)=>{
      state.isLoading=true
      state.data.push("hello")
      console.log(state);

    })
    builder.addCase(getProducts.rejected,(state,action)=>{
      state.isLoading=true
     state.error=action.payload;
     state.data=[]
    })
    

  }
    
})


export default dealSclice.reducer;
