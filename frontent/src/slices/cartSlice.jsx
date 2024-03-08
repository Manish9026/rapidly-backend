import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Slide, ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.baseURL =process.env.React_App_BASE_URL



// const userAddCart=createAsyncThunk("userAddCart",async(cartData)=>{
// return await axios.post('/api/user/addcart',cartData).then(res=>{

// }).catch(err=>{

// })
// })
    

const addCart=createAsyncThunk("cartuser/addCart",async(data)=>{
      
         
    
    return await axios.post("/api/user/addcart",data).then(res=>{
         
        if(res.data.status==="success"){

            toast("successfully added",{containerId:"cart"})
           

        }
        else
        toast.error("Already added",{containerId:"cart"})


    })
  

})


const getCartData=createAsyncThunk("cartuser/getCartData",async()=>{
   
  
   
    return await axios.get("/api/user/cartdata").then(res=>{
          

       
       
        return res.data


    })
   
  
   
})


const removeCartOne=createAsyncThunk("cartuser/removeCartOne",async(id)=>{

    // alert(id)
      await axios.post("/api/user/remove/Cartdata",{id}).then(res=>{
        if(res.data.status==="success"){
            toast.success("successfully Removed",{containerId:"cart"})
            
        }else
        toast.error("Already Removed",{containerId:"cart"})
      })
})

const cartUserSlice=createSlice({
    name:"cartUser",
    initialState:{
        data:[],
        cartQyt:0,
        loading:false,
    },

    extraReducers:(builder)=>{

// addcart function part
            builder.addCase(addCart.pending,(state)=>{

            })
            builder.addCase(addCart.fulfilled,(state,{payload})=>{
             state.cartQyt +=1;

            })
            builder.addCase(addCart.rejected,(state)=>{
                
            })
 //end addcart function part



// getcartdata function part 
            builder.addCase(getCartData.pending,(state)=>{
state.loading=false;
            })
            builder.addCase(getCartData.fulfilled,(state,{payload})=>{

                state.data=payload;
               state.cartQyt=state.data.length;
state.loading=true;

               
            })
// end getcartdata function part



// removecart function part

            builder.addCase(removeCartOne.pending,(state)=>{

            })
            builder.addCase(removeCartOne.fulfilled,(state,{payload})=>{
                state.cartQyt -=1;
            })
// end removecart function part


    }
    // reducers:{
    //     addCart(state,action){
    //         const {name,image,price}=action.payload;
    //         // console.log(name);
    //         state.cartQyt+= 1;
    //         state.data=[...state.data,{productName:name,image,price,userEmail:"manishmaurya@gmail.com"}]

    //         
           
            
       
    
    //     // console.log(state.data)
    //     },
    //     removeCart(state,action){}
    // },
  
})

// console.log(cartUserSlice.reducer);
export default cartUserSlice.reducer;
export {addCart}
export {getCartData}
export {removeCartOne}



