import React, { useCallback, useEffect, useState } from 'react'
import './Product.scss'
import { FaCaretDown } from "react-icons/fa";
import ProductCard from './ProductCardComponent'
import {
  FaFilter, FaArrowUpWideShort
} from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { getClean, getSearchData, setLoading, setSkip } from '../../slices/searchDataSlice';
import Card from '../../component/home/Card/Card';
import { Loader } from '../../component/tools/BoxLoader/Loader';
import { useParams } from 'react-router-dom';

const Product = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5)
  const [category, setCategory] = useState("");
  // const data=useSelector(state=>{return state.searchData.data})
  const { skip, Loading, data } = useSelector(state => { return state.searchData })

  const { searchData } = useSelector(state => { return state.searchData })
  const [loaderStatus, setLoaderStatus] = useState(false)
  const [element1, setElement1] = useState({ display: "disable", icon: "upRotate" })
  const [element2, setElement2] = useState({ display: "enable", icon: "downRotate" })
  const [element3, setElement3] = useState({ display: "enable", icon: "downRotate" })
  const [element4, setElement4] = useState({ display: "disable", icon: "upRotate" })
  const [element5, setElement5] = useState({ display: "disable", icon: "upRotate" })
  const [filter, setFilter] = useState("disable");
  let scrollHeight, totalHeight, viewHeight;
  const windowWidth = useRef(window.innerWidth);
  const scrollLoad = useRef();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const [filterPos, setFilterPos] = useState();
  useEffect(() => {
    // const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchParams).get("searchID");
    setCategory(params);

    if (windowWidth.current >= 600) {
      setFilter("enable")
    }

    scrollLoad.current.scrollTop = 0;
    dispatch(getClean())
    dispatch(getSearchData({ params, "skip": 0, limit }));

  }, [searchData]);


  useEffect(() => {
    dispatch(setLoading())
    let i=setTimeout(()=>{
         
      dispatch(getSearchData({ category, skip, limit }))
    },1500)

   return ()=> clearTimeout(i)
  }, [loaderStatus])



  const onScrollHandler = useCallback(async (e) => {
    scrollHeight = e.target.scrollTop
    totalHeight = e.target.scrollHeight
    viewHeight = e.target.clientHeight
    e.target.offsetParent.clientWidth<=600? setFilterPos(0):
    setFilterPos(scrollHeight)
    console.log(e.target.offsetParent.clientWidth);

    let currentScrollHeight = Math.floor(scrollHeight + viewHeight)
    // console.log(scrollHeight,totalHeight,currentScrollHeight);

    if (currentScrollHeight >= totalHeight-40) {

      setLoaderStatus(prev => !prev)
      console.log("timeout")
    
    }
  }, [skip])


  // dropDown controller
  const dropDownHandler = (e) => {
    const id = e.target.id;

    switch (id) {
      case "1": {
        if (element1.display === "enable") {
          setElement1({ display: "disable", icon: "upRotate" })
        }
        else {
          setElement1({ display: "enable", icon: "downRotate" })

        }
        break;
      }
      case "2": {
        if (element2.display === "enable") {
          setElement2({ display: "disable", icon: "upRotate" })
        }
        else {
          setElement2({ display: "enable", icon: "downRotate" })

        }
        break;
      }
      case "3": {
        if (element3.display === "enable") {
          setElement3({ display: "disable", icon: "upRotate" })
        }
        else {
          setElement3({ display: "enable", icon: "downRotate" })

        }
        break;
      }
      case "4": {
        if (element4.display === "enable") {
          setElement4({ display: "disable", icon: "upRotate" })
        }
        else {
          setElement4({ display: "enable", icon: "downRotate" })

        }
        break;
      }
      case "5": {
        if (element5.display === "enable") {
          setElement5({ display: "disable", icon: "upRotate" })
        }
        else {
          setElement5({ display: "enable", icon: "downRotate" })

        }
        break;
      }
    }

  }
  //  end dropDown controller
  return (<div>
    <section className="product-section " ref={(e) => scrollLoad.current = e} onScroll={(e) => { onScrollHandler(e) }}>

      
        <div className="product-filter" id={filter} style={filterPos < 80 ? { top: `${0}px` } : { top: `${0 + filterPos}px` }}>
          <div className="heading">
            product filter
          </div>
          <div className="filter-property" >
            <div className="property-card" >
              <div className="sub-heading" onClick={dropDownHandler} id="1">
                category <FaCaretDown className={element1.icon} />
              </div>
              <ul id={element1.display}>
                <li>laptop</li>
              </ul>


            </div>
            <div className="property-card">
              <div className="sub-heading" onClick={dropDownHandler} id='2'>
                price <FaCaretDown className={element2.icon} />
              </div>

              <ul id={element2.display}>
                <label htmlFor=""><li><input type="checkbox" name="" id="" /> 0 - 1000</li></label>
                <label htmlFor=""><li><input type="checkbox" name="" id="" />1000-2000</li></label>
                <label htmlFor=""><li><input type="checkbox" name="" id="" />2000-100000</li></label>
                <label htmlFor=""><li><input type="checkbox" name="" id="" />100000 above</li></label>

              </ul>

            </div>
            <div className="property-card">
              <div className="sub-heading" onClick={dropDownHandler} id='3'>
                brand <FaCaretDown className={element3.icon} />
              </div>
              <ul id={element3.display}>
                <label htmlFor="hp"><li><input type="checkbox" name="" id="hp" /> hp</li></label>
                <label htmlFor="acer"><li><input type="checkbox" name="" id="acer" /> acer</li></label>
                <label htmlFor="redmi"><li><input type="checkbox" name="redmi" id="redmi" />redmi</li></label>
                <label htmlFor="notebook"><li><input type="checkbox" name="" id="notebook" />notebook</li></label>
                <label htmlFor="realme"><li><input type="checkbox" name="" id="realme" /> realme</li></label>
                <label htmlFor="dell"><li><input type="checkbox" name="" id="dell" /> dell</li></label>
                <label htmlFor="asus"><li><input type="checkbox" name="" id="asus" /> asus</li></label>
                <label htmlFor="lenvo"><li><input type="checkbox" name="" id="lenvo" />lenvo</li></label>

              </ul>


            </div>

            <div className="property-card" id='10'>
              <div className="sub-heading" onClick={dropDownHandler} id='4'>
                customer rating
                <FaCaretDown className={element4.icon} />
              </div>

              <ul id={element4.display} >

                <label htmlFor="3star"><li ><input type="checkbox" name="" id="3star" />  3 * & above</li></label>
                <label htmlFor="4star"> <li><input type="checkbox" name="" id="4star" /> 4 * & above</li> </label>
              </ul>

            </div>


            <div className="property-card">
              <div className="sub-heading" onClick={dropDownHandler} id='5'>
                hello
                <FaCaretDown className={element5.icon} />
              </div>

              <ul id={element5.display} >
                <li ><input type="checkbox" name="" /> 3 * & above</li>

              </ul>

            </div>
          </div>

        </div>
      

      <section className="product-card-section" onScroll={(e) => { onScrollHandler(e) }}>
        <div className="product-nav " >
          <span onClick={() => { filter === "disable" ? setFilter("enable") : setFilter("disable") }} ><FaFilter /></span>
          <span> <FaArrowUpWideShort /></span>



        </div>

        {data === null ? <h1>hello </h1> :

          category == "laptops" ? data.map((item, index) => {
            return (
              <ProductCard card_data={item} key={item._id} />
            )
          }) :
            data.map((item, index) => {
              return (
                item.category == "laptops" || "smartphones" ? <Card product={item} key={item._id} /> : <ProductCard card_data={item} key={item._id} />

              )
            })
        }

        <div className='loader-section'>
          {Loading ? <Loader /> : <span className=''> no more products</span>}

        </div>


        {/* <Loader/> */}
        {/* <button onClick={()=>{dispatch(getSearchData({category,skip,limit}))}}>next</button> */}
      </section>

    </section>
  </div>
  )
}

export default Product