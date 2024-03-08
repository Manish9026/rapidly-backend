import React, { useEffect, useState } from 'react'
import './Single_page.scss'
import axios from 'axios'
import { SlLike, SlDislike } from 'react-icons/sl'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addCart } from '../../slices/cartSlice.jsx'
import { VscChromeClose } from "react-icons/vsc";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Product_section from '../home/Product section/Product_section'
import { NavLink,Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import product from '../../product api/product.json'
import { getSingleProductData } from '../../slices/searchDataSlice.js'
import { addCheckoutData } from '../../slices/checkoutSlice.js'
import { BiCross } from 'react-icons/bi'
axios.defaults.baseURL = process.env.React_App_BASE_URL


const Single_page = () => {
  const { prdID } = useParams();

  const data = useSelector(state => { return state.searchData.singleData })

const [hoverImage,setHoverImage]=useState()
const [ imagePopup,setImagePopup]=useState(0)
const dispatch = useDispatch();
const [prdCategory,setPrdCategory]=useState();
  const navigate = useNavigate();
  const userStatus = useSelector(state => { return state.authuser.status })





  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    dispatch(getSingleProductData(params.get("prdID")))
    setPrdCategory(params.get("prdType"))
  }, [])


  const addcart_data = () => {



    if (userStatus === "success")
      dispatch(addCart((data)))
    else
      navigate("/login")

    // console.log(Data);
    // console.log(`data is ${addCart}`)

  }

const ImagePopup=()=>{


  return(

<div className="img-popup" style={imagePopup?{display:"flex"}:{display:"none"}} >
  <div className="imgftm" >
    <div className="frame-1 active" onClick={()=>{setImagePopup(0)}}> 
    <VscChromeClose  className='icon'/></div>
   <img src={hoverImage || data.image || data.images[0]} alt="" />

   
  </div>
</div>




  //   <div className="image-popup flex" style={imagePopup?{display:"flex"}:{display:"none"}}>
  //   <button onClick={()=>setImagePopup(0)}>X</button>
  //   <span className="Imgfe">

  //   <img src={hoverImage || data.image || data.images[0]} alt="" />
  //   </span>
  //  </div>
  )
}

  if (data) {
    return (
      <section className='single-page-container'>
         
        <ImagePopup/>

        <div className="single-page-product-section flex ">
  
          <div className="btn-section">

            <button onClick={addcart_data}>
              add  cart 
            </button>

            <Link to="/checkout"> <button onClick={()=>dispatch(addCheckoutData(data))}>buy now</button></Link> 
           
          </div>
          <div className="left-top-section">
            <div className="img-section">
              <span className="sub-img flex1">
                {
                  data.images.map((item,index)=>{

                    return(
<img  key={index} src={item} alt="dfg"  className='sub-image' onMouseEnter={()=>{console.log("hello");
setHoverImage(item)}}/>
                    )
                  })
                }
                
                
                {/* <img src="https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/5/k/d/xl-t572-nb-eyebogler-original-imagh42hkhrtagyv.jpeg?q=70&crop=false" alt="dfg" className='sub-image'/> */}
              </span>
              <img src={hoverImage?hoverImage:data.images[0] || data.image} alt="" onClick={()=>{setImagePopup(prev=>!prev)}} />
            </div>


            <div className="btn-section">

              <button onClick={addcart_data}>
                add  cart
              </button>
              <Link to="/checkout"> <button  onClick={()=>dispatch(addCheckoutData(data))}>buy now</button></Link> 

            </div>
          </div>

          <div className="right-bottom-section flex1">
            <div className="product-detail-section cover ">
              <div className="product-name flex">
                <div className='name'>
                  <p style={{ color: "white", marginRight: "5px", display: "inline", fontSize: "20px" }}> {data.description}</p>
                </div>

                <div className="rating flex"><span>2.5 <AiFillStar /> </span> rating 4&rivews 2
                </div>


              </div>

              <div className='price-section '>
                <li>₹{data.price}</li>
                <li>₹2,43,990</li>
                <li> 12% off</li>

              </div>
            </div>

            <div className="product-offer-section cover ">

              <li>offer 1: Lorem, ipsum dolor sit amet consectetur adipisicing elit. , exercitationem incidunt labore </li>
              <li>offer 2: Lorem, ipsum dolor sit amet consectetur adipisicing elit., exercitationem incidunt labore </li>
              <li>offer 3: Lorem, ipsum dolor sit amet consectetur adipisicing elit. ut, exercitationem incidunt labore q</li>
              <li>offer 4: Lorem, ipsum dolor sit amet consectetur a</li>
              <li>offer 5: Lorem, ipsum dolor sit amet consectetur adipisicin</li>

            </div>



            {/* <div className="order-detail-section cover">


          </div> */}


            <div className="product-specification-section cover flex1">
              <h5 className='heading'>specification</h5>
              <div className="specification-column flex1 list-none">
                <div className="columns list-none">
                  <li>column1</li>
                  <li>column2</li>
                  <li>column3</li>
                  <li>column4</li>
                </div>
                <div className="column-details list-none">
                  <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, ipsam!</li>
                  <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, at!</li>
                  <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, deserunt.</li>
                  <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, natus.</li>

                </div>
              </div>

            </div>


            <div className="rating-preview-section cover ">
              <h5 className='heading'>rating & rivews</h5>
              <span className="rating-review-container">
                <span className="totalRating">

                  <span><p>{typeof (data.rating) === 'object' ? data.rating.rate : data.rating}<AiFillStar className='icon' /> </p><p>100 rating & 300 review</p></span>

                </span>


                <span className="rating-range-wrapper flex1 ">

                  <ul><li><AiFillStar className='icon' /> 5</li> <span><li style={{ background: "green", width: "90%" }} /></span><p>20</p>  </ul>
                  <ul><li><AiFillStar className='icon' /> 4</li> <span><li style={{ background: "blue", width: "70%" }} /></span> <p>30</p> </ul>
                  <ul><li><AiFillStar className='icon' /> 3</li> <span><li style={{ background: "orange", width: "40%" }} /></span> <p>4</p> </ul>
                  <ul><li><AiFillStar className='icon' /> 2</li> <span><li style={{ background: "gray", width: "20%" }} /></span>  <p>10</p></ul>
                  <ul><li><AiFillStar className='icon' /> 1</li> <span><li style={{ background: "red", width: "5%" }} /></span> <p>1</p> </ul>

                </span>
                <span className='rating-btn  '>
                  <button > Rate product</button>
                </span>

              </span>


              <div className="costumer-feedback-section flex1">
                <ul>
                  <li className='rating-heading' >4 <AiFillStar className='icon' /></li>
                  <li>feedback title</li>
                </ul>

                <div className="discription-section flex1">
                  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dolorum perferendis, eum minima sapiente quo.</p>
                  <div className="product-image">

                  </div>
                </div>

                <footer>
                  <p>
                    userName
                  </p>

                  <span className="icon">
                    <SlLike />
                    <SlDislike />
                  </span>
                </footer>



              </div>

            </div>

          </div>
        </div>
        <div className="related-product">
          <Product_section heading_name="similar product" type={prdCategory} />
        </div>
        <div className="related-product">
          <Product_section heading_name="recently viewed" data1={product} loading="true" />
        </div>



      </section>
    )
  }
  else{
    return(

   <div className="loader"></div> 
    )

  }


}










export default Single_page
