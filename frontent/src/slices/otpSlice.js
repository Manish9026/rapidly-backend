
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { json } from 'react-router-dom'
import {Slide, ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.baseURL =process.env.React_App_BASE_URL



 export const loginWithOtp=createAsyncThunk("otpFeature/loginWithOtp",async(data)=>{
  
  return axios.get(`api/user/r1/login?num=${data.num}&code=${data.countryCode}`).then(res=>{
        if(res.data.status){
            toast.success(res.data.message, { containerId: "login" })
           
            // toast(res.data.message)
        }else{
            toast.error(res.data.message, { containerId: "login" })
        

        }
    return res.data

}).catch(err=>{})


})



const otpSlice=createSlice({
    name:"otpFeature",
    initialState:{
        otp:null,
        num:null,
        otpPanel:0,
        loading:false,
        message:null,
        time:0,
        countryCode:null
    },
    reducers:{
   
        setOtpPanel(state){
            console.log("hello")
            state.otpPanel=true;
        },

        reStartTime(state){
            state.time=3;
            console.log("hello")
            return state
        },
        
        setOtpNum(state,action){
state.mobNum=action.payload;
        },

        removeOtpState(state){
          state.countryCode=null;
          state.num=null;
          state.countryCode=null;
          state.time=0;
          state.otp=null;
          state.message="";
        }
        ,removeOtpPanel(state){
            state.otpPanel=false;

        },
       

},
extraReducers:(builder)=>{

    builder.addCase(loginWithOtp.pending,(state,{payload})=>{
state.loading=true;
    })
    builder.addCase(loginWithOtp.fulfilled,(state,{payload})=>{
        state.message=payload.message;
        state.otpPanel=payload.status;
        state.loading=false;
        state.otp=payload.otp;
        state.num=payload.num;
        state.countryCode=payload.code;
        state.time=3
    })

}

})


export default otpSlice.reducer;
export const {setOtpPanel,removeOtpPanel,setOtpNum,reStartTime,removeOtpState}=otpSlice.actions;