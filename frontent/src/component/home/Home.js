import React, { useEffect } from 'react'
import './Home.css'
import Hero from '../Hero section/Hero'
import Card from './Card/Card.js'
import Product_section from "./Product section/Product_section"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../slices/dealsSlice'
import product from "../../product api/product.json"

const Home = () => {
const state=useSelector(state=> {return state.todaydeal})
const user=useSelector(state=>{ return state.authuser})

// useEffect(()=>{
// dispatch(getProducts());

// },[])





  
  return (
    <div className='home_section '>
      
      <Hero/>
      <div className="banner_section">
       
    <Product_section heading_name=" Today Deal" type="electronics"/>
      <Product_section heading_name=" Trending Product"  loading="true" type="women's clothing"/>
      <Product_section heading_name=" Groserg deals"   loading="true" type="smartphones"/>

     
      </div>
  
    </div>
  )
}

export default Home