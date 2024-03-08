import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import "./Product_section.scss"
import product from "../../../product api/product.json"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../slices/dealsSlice'
import axios from 'axios'
axios.defaults.baseURL =process.env.React_App_BASE_URL


const Product_section = (props) => {
  const dispatch=useDispatch();
  const {data}=useSelector(state=> {return state.todaydeal})

  const [prdData,setPrdData]=useState([])

let product=[];
  
  // console.log(props)
useEffect(()=>{
 console.log(props.type)
   axios.get(`/api/deal?prdType=${props.type}`).then(res=>{
    setPrdData(res.data.data)
    console.log(res.data.data)
  })

// dispatch(getProducts(props.type));

  // console.log(props.type)
  // console.log(data);
},[props])


  return (
    <div className="product_section ">
        <div className="product_heading">
           {props.heading_name}
        </div>
        <div className="card_container1 ">
          {
           prdData.map((item,index)=>{
              return(  
              <Card  key={index} product={item}/>
                
              )
            })
          }
            
          
           
             
        </div>
   
        
    </div>
  )
}

export default Product_section