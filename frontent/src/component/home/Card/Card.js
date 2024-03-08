import React,{useState} from 'react'
import "./Card.scss"
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineHeart} from "react-icons/ai"
import {BiShareAlt} from 'react-icons/bi'
import {FiShoppingBag} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { savecart } from '../../../slices/cartDetailSlice';
import { addCart } from '../../../slices/cartSlice'


const Card = (props) => {
   const navigate=useNavigate()
  const dispatch=useDispatch();
  const [counter,setCounter]=useState(0)
const userStatus=useSelector(state=>{return state.authuser.status})

// const data=useSelector(state=>{return state.cartDetail})

   
// console.log(`props = ${JSON.stringify(props)}`)

   const propshandler=()=>{

   dispatch(savecart(props.product))
   }

// console.log(`data is ${JSON.stringify(data)}`)


   // this function is used to store data in cart section
   const addcart_data = () => {

      if(userStatus==="success"){
         
         dispatch(addCart(props.product))
         
      }else{
         console.log(`userstatus ${userStatus}`)
      navigate("/login")
      }
    
    }
   

   //  console.log(props.product)

   const imageCounter=async()=>{
     setCounter(prev=>prev+1)
   
      

// if(counter<props.product.images.length)
//      setCounter(counter+1)
//    else
//    setCounter(0)

   }
  
  return (
   
   
  
     <span className="card_container " onClick={propshandler}>

      <div className="card-options">
         <li> <AiOutlineHeart/></li>
         <li><BiShareAlt/></li>
         <li><FiShoppingBag onClick={addcart_data}/></li>
    
      
      
      </div>
        <Link to={`/single_page?prdID=${props.product._id}&prdType=${props.product.category}`} className=' 
   link_container'><div className="img_section" >
       <img src={props.product.image || props.product.images[counter] } onMouseEnter={ ()=>{imageCounter()}} alt="" onMouseLeave={()=>{setCounter(0)}}/>
        </div><h6 className='image_brand'></h6>
        <div className="card_footer">
           <div className="product_name">
            {(props.product.title).slice(0,22)}
           </div>
           <span className='product_price flex'>{props.product.price}$ 
           
           
           </span>
           <div className="product_discount">
            50% off today
           </div>
           
        </div>
    </Link>
    
    
     </span> 
   
  

   
    
  )
}

export default Card