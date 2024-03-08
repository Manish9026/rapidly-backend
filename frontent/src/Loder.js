
import { userVerifier } from "./slices/authSlice"
import { getCartData } from "./slices/cartSlice"
import { removeCartOne } from "./slices/cartSlice"
// import  { useCookies } from 'react-cookie';

import { useNavigate } from "react-router-dom"




const loader=(dispatch,status)=>{

   
    dispatch(userVerifier())
    dispatch(getCartData())

}

const cartLoader=(dispatch,_id,status)=>{
     console.log(status)
    dispatch(removeCartOne(_id))
    dispatch(getCartData())


}


export {loader,cartLoader}