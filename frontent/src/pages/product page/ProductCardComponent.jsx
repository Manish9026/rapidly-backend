

import React, { useEffect, useState } from 'react'
import {Link } from "react-router-dom"
import './Product.scss'
import { useDispatch } from 'react-redux'
import { savecart } from '../../slices/cartDetailSlice'
import { IoStarHalf,IoStar } from "react-icons/io5";
const ProductCardComponent = (props) => {
const [discountValue,setDiscountValue]=useState("");
const [priceStyle,setPriceStyle]=useState({act:{display:"block"},discount:{textDecoration:"line-through"}})
// const [discountPercentage,setDiscountPercentage]=useState("");

  const dispatch=useDispatch;
  const {card_data}=props;


  useEffect(()=>{
    if(card_data.discountPercentage){
    let num=(card_data.discountPercentage/100)*card_data.price
    num=(card_data.price)-num;
    setDiscountValue(num.toFixed(2))
    }else{
      setDiscountValue(card_data.price)
      setPriceStyle({act:{display:"none"},discount:{textDecoration:"none",marginRight:"10px"}})
    }
    // setDiscountPercentage((card_data.discountPercentage).parseInt)
  },[])

  

 
  return (
    <div className='product-card'  >

        <Link to={`/single_page?prdID=${card_data._id}&prdType=${card_data.category}`} className="prd-link" >
            <img src={card_data.images[0] || card_data.image} alt='' />
            <div className="product-content"><h5></h5>
               <ul>
                <li>{card_data.title}</li>
                <li className='stars-line'><p className='stars'><IoStar/> <IoStar/><IoStar/><IoStar/><IoStarHalf/></p> <p>({card_data.rating.count || "80"})</p></li>
                <div className='price-section '>
              <li style={priceStyle.discount}>₹ {card_data.price}</li>
              <li style={priceStyle.act}>{discountValue }</li>
              <li> {Number.parseInt(card_data.discountPercentage) || "0"}% off</li>

            </div>
              
                <li>hello</li>
               </ul>
               
            </div>
        </Link>
        
        {/* {card_data.description}
        */} 

    </div>
  )
}

export default ProductCardComponent

