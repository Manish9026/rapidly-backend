import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import './navbar.scss'
import logo from '../../asscets/logo.png'
import { FaShoppingCart, FaChevronDown } from "react-icons/fa"
import { AiOutlineHeart, AiOutlineMenu, AiFillSetting, AiOutlineQuestionCircle } from "react-icons/ai"
import { GrSearch, GrCopy } from "react-icons/gr"
import { BsFillBackspaceReverseFill, BsBoxSeam, BsQuestionCircle } from 'react-icons/bs'
import { CgMenuRound } from "react-icons/cg"
import { RiAccountCircleLine } from 'react-icons/ri'
import { BiCategory, BiSolidUserDetail, BiSupport } from 'react-icons/bi'
import { HiLocationMarker, HiOutlineLogout } from 'react-icons/hi'
import { MdOutlineCircleNotifications, MdLocalPolice } from 'react-icons/md'
import { TiHomeOutline } from 'react-icons/ti'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { userVerifier ,userLogout} from '../../slices/authSlice.js'
import { loader} from '../../Loder'
import { getCartData } from '../../slices/cartSlice.jsx'
import { useCookies } from 'react-cookie';
import { getData, getSearchData } from '../../slices/searchDataSlice.js'
import Search from '../../pages/Search page/Search.jsx'

import { GoSearch } from "react-icons/go";
import { categories } from '../../pages/category.js'


const Header = () => {

  const location=useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const { cartQyt } = useSelector((state) => { return state.cartUser })
  const { status, userName } = useSelector(state => { return state.authuser })
  const [idChanger, setIdChanger] = useState("mobile-menu-bar none")
  const [navButton, setNavButton] = useState("")
  const [logoutDisplay, setLogoutDisplay] = useState("");
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

  // searching functionality----------
  const optionHandler = (e) => {
    // alert("hello")
    const value = e.target.value;
    console.log(value)
    setSearchData(value);
  }
  const handler = (e) => {
    console.log(searchData)
    // dispatch(getSearchData(searchData))
  }
  //end  searching functionality-------!


  //mobile functionality---------------
  const logoutHandler = () => {

   dispatch(userLogout())
    removeMenu();
    

  }
  const removeMenu = () => {

    // setIdChanger("mobile-menu-bar block")
    if (idChanger === "mobile-menu-bar none") {
      setIdChanger("mobile-menu-bar block")
    }
    else {
      setIdChanger("mobile-menu-bar none")

    }

  }
  //end mobile functionality-----------!

  //user verifier functionality--------
  useEffect( () => {
    loader(dispatch, status)

  if (status === 'success') {
    setNavButton("none")
    setLogoutDisplay("btn block")
  }
  else {
    setNavButton("flex")
    setLogoutDisplay("none")
  }
  },[status,cartQyt])

  

  //end-------------------------------!


  return (
    <>
      <div className="main-container">


        <div className={idChanger}  >
          <BsFillBackspaceReverseFill onClick={removeMenu} className='backspace-icon' />


          <div className="userProfile flex">
            <img src="" alt="" />
            <span> <h5>{userName}</h5>
              <h6></h6>
            </span>

          </div>

          <div className="user-setting">
            <Link to="/" onClick={removeMenu}>  <li><TiHomeOutline className='icon' /><p>home</p></li></Link>
            <Link to="order" onClick={removeMenu}> <li><BsBoxSeam className='icon' /><p>order</p></li></Link>
            <Link to="address" onClick={removeMenu}> <li><HiLocationMarker className='icon' /> <p>Saved Address </p></li></Link>
            <Link to="/account/profile" onClick={removeMenu}> <li><BiSolidUserDetail className='icon' /><p>Edit profile</p></li></Link>

            <Link to="/" onClick={removeMenu}> <li><AiFillSetting className='icon' /><p>setting</p></li></Link>
            <Link to="/" onClick={removeMenu}> <li> <BiSupport className='icon' /><p>customer support</p></li></Link>
            <Link to="/" onClick={logoutHandler}> <li><HiOutlineLogout className='icon' /><p>Logout</p></li></Link>

          </div>


          <div className="footer-section">
            <div className="heading">feedback & information</div>
            <ul className='flex1'>
              <li ><MdLocalPolice className='icon' style={{ color: "\red" }} /> <p>Terms,policies and Licenses</p></li>
              <li><AiOutlineQuestionCircle className='icon' /><p>browser FAQs</p></li>
            </ul>

          </div>







        </div>

<section className='mobile-footer-menu'>
        <div className="mobile-menu-bar-icons flex">
              <Link to="/"><TiHomeOutline className='icon' /></Link>
              <BiCategory className='icon' />
              <MdOutlineCircleNotifications className='icon' />
              <AiOutlineHeart className='icon' />
              <Link to="/login" id='login' className={navButton} ><RiAccountCircleLine className='icon' /></Link>

              <div className="cart flex">
                <Link to="/cart">
                  <FaShoppingCart className='icon' ></FaShoppingCart>    </Link>
                <div className="count">{cartQyt}</div>

              </div>

            </div>
            </section>


        
      </div>


      <section className="nav_section flex " >

        {/*  mobile-navbar component start */}
            <div className="mobile-navbar">
            <div className="logo-section">
            <AiOutlineMenu className='menu-bar-icon' onClick={removeMenu} />
            <img src={logo} alt=""  />
            </div>
          
          <span className='search-icon'>
            <Link to={{pathname: "/search-product", state: { prevPath: location.pathname }}}> <GoSearch className='icon'/></Link>

            
          </span>
          </div>
   
        {/*  mobile-navbar component end */}

        <div className="left_nav flex">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
       
        
          <div className="search_section flex">
            <select name="" className="option_bar hide_shadow" onChange={(e) => { optionHandler(e) }}>
             
              <option value="" >all</option>
             {
              categories.map((item,index)=>{
                return (
              <option value={item} key={index}>{item}</option>

                )
              })
             }

            </select>
            <input type="text" name="search" className="search_bar hide_shadow" placeholder='search product' value={searchData}
              onChange={(e) => { setSearchData(e.target.value) }} />
            <Link to={`/product?searchID=${searchData}`} ><div className="search_icon hide_shadow" onClick={()=>dispatch(getData(searchData))} >
              <GrSearch className='search_icon1' />
            </div></Link>
          </div>
        </div>

        
        <div className="right_nav flex">
          <ul className="context_part "> 
            
          <Link to="/"> <li className="nav_content">home</li></Link>
        
          <Link to="/about"><li className="nav_content">categories</li></Link>
          <Link to="/en/products"> <li className="nav_content">join products</li></Link>
         
          </ul>
          

          <div className="sub_right flex">

         



            <div className="cart flex">
              <Link to="/cart">
                <FaShoppingCart className='icon' ></FaShoppingCart>    </Link>
              <div className="count">{cartQyt}</div>

            </div>



            <div className={` nav_btn ${navButton}`}> {/*navButton==nav_btn flex*/}

              <button className='btn hide_shadow' >
                <label htmlFor="login  ">
                  <Link to="/login" id='login'>Login</Link>
                </label>

              </button>



              <button className='btn hide_shadow'> <label htmlFor="register" className='label'>
                <Link to="/register" id='register'>Register</Link>
              </label>
              </button>


            </div>

            <div className={`userSeting-section ${logoutDisplay}`}>

              <div className="userProfile flex">


                <img src="" alt="" />
                <span> <h5>{userName}</h5>
                  <h6></h6>
                </span>

                < FaChevronDown />

              </div>

              <div className="user-setting ">
                <Link to="/" onClick={removeMenu}>  <li><TiHomeOutline className='icon' /><p>home</p></li></Link>
                <Link to="/order" onClick={removeMenu}> <li><BsBoxSeam className='icon' /><p>order</p></li></Link>
                <Link to="address" onClick={removeMenu}> <li><HiLocationMarker className='icon' /> <p>Saved Address </p></li></Link>
                <Link to="/account" onClick={removeMenu}> <li><BiSolidUserDetail className='icon' /><p>Edit profile</p></li></Link>

                <Link to="/" onClick={removeMenu}> <li><AiFillSetting className='icon' /><p>setting</p></li></Link>
                <Link to="/" onClick={removeMenu}> <li> <BiSupport className='icon' /><p>customer support</p></li></Link>
                <Link to="/" onClick={logoutHandler}> <li><HiOutlineLogout className='icon' /><p>Logout</p></li></Link>

              </div>


              {/* <div className={logoutDisplay} >
                <Link to="/account">Account</Link>
              <button onClick={logoutHandler}> Logout</button>


              </div> */}

            </div>
          </div>

        </div>

      </section>



      {/* <header></header> */}
      
      


    </>


  )
}

export default Header