import './Cart.scss'
import React, { useState,useEffect,useContext } from 'react'
import Cart_card  from './cart product/Cart_card'
// import cart_product from '../../product api/cart.json'

import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'


function EmptyCart(){
  return(
    <div className='notification-secttion'>
      <header><p>shoping cart</p></header>
       <div className="notification-body">
  
        <p>Cart is empty</p>
       </div>
     
  
  
    </div>)
}

const Cart = () => {

const [totalPrice,setTotalPrice]=useState(0);
// const dispatch=useDispatch();
const {data,cartQyt}=useSelector((state)=> {return state.cartUser

})

let i,sum=0;

useEffect(()=>{

    
    for(i=0;i<data.length;i++){
      sum=sum + Number(data[i].price)
  
}
setTotalPrice(sum);



},[data])



if(data.length!=0){
  return ( 
    
    <section className='product-cart-section '>
    <div className="cart-section ">
<div className="heading">shoping cart</div>

{
  data.map((cart,index)=>{
    return(
<Cart_card product={cart} key={index}/>
    )
   })
}


{/* <div className="footer-section flex">
  <span>total section</span>

  <button className='btn '>check out</button>
  <div className="total-price-section">
    {totalPrice}
  </div>


</div> */}

    </div>

    <div className="price-detail-section">


      <div className="price-amount-section">
        <div className="heading">price Detail</div>
        <hr/>
        <div className="amount-section">
          
          <ul>
            <li>price ({cartQyt} item)</li>
            <li>discount</li>
            <li>dilvery charge</li>
          </ul>

          <ul>
          
            <li>{totalPrice}</li>
            <li>52</li>
            <li>52</li>
          </ul>
          
        </div>
<hr/>
      </div>
      <div className="checkout-btn flex1">
        <ul>
          <li>total amount</li>
          <li> {totalPrice}</li>
        </ul>
        <hr/>
        <button>checkout</button>
      </div>
    </div>
    
   
    
    </section>
  )
}
else{
  return(
    <EmptyCart/> 
  )
}


}




export default Cart