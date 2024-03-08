import React, { useState } from 'react'
import './Search.scss'
import '../../component/header/navbar.scss'
import Product from '../product page/Product'
// import {AiOutlineMenu } from 'react-icons/ai'
import { Link, useLocation, useParams,useHistory, useNavigate, useNavigation, useNavigationType } from 'react-router-dom'
import {GrSearch} from 'react-icons/gr'
import { IoArrowBackOutline } from "react-icons/io5";

import { useDispatch } from 'react-redux'
import { getData, getSearchData } from '../../slices/searchDataSlice'
{/* <Link to={`/product?searchID=${searchData}`} ><div className="search_icon hide_shadow" onClick={()=>dispatch(getData(searchData))}  */}
const Search = () => {

   const navigate=useNavigate();
 
   
const [recentSearchData,RecentSearchData]=useState([ "home-decoration"
    ,"jewelery",
    "smartphones",
    "electronics",
    "laptops",
    "women's clothing",
    "men's clothing",
   "groceries"])
const dispatch=useDispatch();
    const [searchData,setSearchData]=useState("");



  return (
   <section className='search-container'>
   <header>

   <span onClick={()=>navigate(-1)}> <Link to=""> <IoArrowBackOutline className='icon'/> </Link></span>
   <ul >
   
   <li className='s1'><input type="text" placeholder='search...' onChange={(e)=>setSearchData(e.target.value)}/> </li>
   <Link to={`/product?searchID=${searchData}`}><li className='s2' onClick={()=>dispatch(getData(searchData))} ><GrSearch/></li></Link>

   </ul>
   </header>

   <div className="search-history flex1">
    <div className="heading">
        recent search
    </div>
    <ul>
        {
            recentSearchData.map((item,index)=>{
                return(
                  
                    <Link to={`/product?searchID=${item}`} key={index}> <li value={item}  onClick={(e)=>dispatch(getData())}  >{item}</li> </Link>
                )
            })
        }
   
    
            
    </ul>
              
   </div>
        
    <div className="search-category-history">
        <div className="heading">
            recent searched category
        </div>
    </div> 

     
   </section>
  )
}

export default Search