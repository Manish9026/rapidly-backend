
import React,{ useState,createContext} from 'react'


import "./Cart_card.scss"
import { useDispatch, useSelector } from 'react-redux';
import { removeCartOne } from '../../../slices/cartSlice';
import { cartLoader } from '../../../Loder';

import { FaRupeeSign } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Cart_card = (props) => {

const {image,price,productName,category,_id,prdID}=props.product;
const {status}=useSelector(state=>{return state.authuser})
 const [qutValue,setQutValue]=useState(5);
 const dispatch=useDispatch();
 const [value,setValue]=useState(1)

const changehandler=(e)=>{
  // console.log(e.target.value);
  setQutValue(e.target.value)

}


const increment=()=>{
  if(value>=10){
    setValue(10)
  }else{
    setValue(value+1)
  }
}
const decrement=()=>{
  if(value===1){
    setValue(1)
  }else{
    setValue(value-1)
  }
  
}





  return (
   
//     <div className='card-section flex' >
//     <div className="img-section left">
//       <img src={image} alt="" />
//     </div>
    
// <div className="product-detail right">
// <div className="product-specification">
//   <p>{productName}</p>
// </div>
// <div className="product-price flex">
//  <p>{price}</p><span>
//   <select name="" id="" className='hide_shadow' onClick={changehandler} >
//   <option value="1">Qut:</option>
    
//     <option value="1">1</option>

//     <option value="2">2</option>
//     <option value="3">3</option>
//     <option value="4">4</option>
//     <option value="5">5</option>
    
//   </select>
// </span>
// </div> 

// <div className="product-brand">
//   <span>brand name : </span>
//   <br/>
//   <span>category type : {category}</span>

// </div>

// </div>

// <input type="checkbox" name="" id="" value={0}/>
// <button className='btn ' onClick={()=>cartLoader(dispatch,_id,status)}>Remove</button>
//     </div>

<Link to={`/single_page?prdID=${prdID}&prdType=${category}`}>

<div className="product-detail">

<img src={image}  alt="" />
<ul className="product-content">
   <li>{productName}</li>
   <li> <FaRupeeSign className='icon'/>{price}</li>
   <li></li>
   <li></li>
</ul>

<ul className='control-bar'>
<div className="quantity-section">
<button onClick={()=>increment()}>+</button> <span>{value}</span><button onClick={()=>{decrement()}}>-</button>
</div>

<button className='remove-btn active transition' onClick={()=>cartLoader(dispatch,_id,status)}>remove</button>

</ul>
</div>
</Link>

  )
}

export default Cart_card

