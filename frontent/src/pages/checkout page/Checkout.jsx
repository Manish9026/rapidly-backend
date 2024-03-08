import React, { useEffect, useRef, useState } from 'react'
import './checkout.scss'

import { useDispatch, useSelector } from 'react-redux';
import { getAddress } from '../../slices/userAddressSlice';
import { Link, useNavigate } from 'react-router-dom';
import Tracker from '../../component/tools/tracker/Tracker';
import { icons } from '../../asscets/assect';



const Checkout = () => {
/* third party library hooks declaration*/
  const navigate = useNavigate();
  const dispatch = useDispatch();
/* declaration of custom state of redux-toolkit*/
  const { status, userName } = useSelector(state => { return state.authuser })
  const productData = useSelector(state => { return state.checkoutData.data })
  const { data } = useSelector(state => { return state.addresses })
  const cartData = useSelector((state) => { return state.cartUser })
/* declaration of state and hooks of react */
  const [selectedAdrs,setSelectedAdrs]=useState([]);
  const [select, setSelect] = useState(0)

  const [listAuth, setListAuth] = useState({
    loginStatus: 0,
    addressStatus: 0,
    productStatus: 0


  })
  useEffect(() => {
    dispatch(getAddress())
    status=='success'?setListAuth({...listAuth,loginStatus:1}):setListAuth({...listAuth,loginStatus:0});
  }, [status])




  const addressSelector = (e,data) => {
    console.log(data)
    try {
      customRadioBtnHandler(e);
      setSelectedAdrs(data);
      setListAuth({...listAuth,addressStatus:true})
    } catch (error) {
      
    }
   


  }



  /* custom raidio button  events*/

  const prevSibling = (element) => {
    let prev = element.previousElementSibling;


    if (prev) {
      prev.lastElementChild.lastElementChild.classList.remove("circle")
      prevSibling(prev);

    } else
      return
  }
  const nextSibling = (element) => {

    let next = element.nextElementSibling;


    if (next) {
      next.lastElementChild.lastElementChild.classList.remove("circle")
      nextSibling(next);

    } else
      return

  }
  const customRadioBtnHandler=(e)=>{



    let bg = e.target.lastElementChild.lastElementChild.classList;
    prevSibling(e.target)
    nextSibling(e.target)

    bg.length ? bg.remove("circle") : bg.add("circle")
  }
  /* custom raidio button  block end*/





  return (
    <section className=' Checkout-section'>

      {/* <button onClick={()=>setSelect(pre=>pre+1)}> inc </button>
<button onClick={()=>setSelect(pre=>pre-1)}>dec </button>

<div>{select}</div> */}

      {/* <Tracker circleNum={4} content={[]} selectValue={select}/> */}

      <div className="checkout-container">

        <div className="checkout-subContainer">


          <div className="login-container">
            <header className="heading">
              <p className="login">login</p>
              {listAuth.loginStatus? <img src={icons.checkIcon} alt="" /> :<></>}
            </header>

            {
              status == "success" ?
              
                //  if user login 
                <div className="login-body">
                  <div className="user-detail">
                    <h3 className="user-name">{userName}</h3>
                    <h3 className="user-mobile-no">userMobileNo</h3>
                  </div>
                  <button className="change-btn">
                    <div className="change">login other account</div>
                  </button>
                </div>
                :
                // if user doesnot login *
                <div className="login-body">
                  <div className="user-detail" style={{ flexDirection: "column", gap: "0" }}>
                    <h2 className="text-styles" style={{ fontSize: "15px" }}>please login yor account,</h2>
                    <h3 className="text-styles">
                      after that you continue buy products
                    </h3>
                  </div>
                  <Link to={"/login"}>
                    <button className="change-btn">
                      <div className="go-to-login-page">go to login page</div>
                    </button>
                  </Link>
                </div>

            }
          </div>


          <div className="userAddress">
            <div className="heading">
              <p>address</p>
              {listAuth.addressStatus ? <img src={icons.checkIcon} alt="" /> :<></>}

            </div>
{
            listAuth.addressStatus?
            <ul className='select-adrs'>
              <li className='flex1'><p>{selectedAdrs.userName} {selectedAdrs.mainMobileNo}</p><span>{selectedAdrs.address},{selectedAdrs.district},{selectedAdrs.state} - {selectedAdrs.pincode}</span></li>
               <li> <button onClick={()=>setListAuth({...listAuth,addressStatus:0})}>change</button></li></ul>:<>
            {

              

              data == null || data.length == 0 ?
                <ul><li > address not exist </li></ul>
                : <ul>
                  {
                    data.map((item, indx) => {
                      return (

                        <li key={item._id} onClick={(e) => addressSelector(e,item)}> <span className='radio' > <span key={indx} className='' ></span></span>{item.userName}</li>
                    
                      )
                    })
                  }

              
                </ul>
            }
            <div className="new-address">
              <label htmlFor="">
                <p>
                  +  add new address
                </p>
              </label>

            </div>
            </>
}

          </div>

          <div className="user-order-summary">
            <div className="heading">
              order summary
              {listAuth.productStatus ? <img src={icons.checkIcon} alt="" />:<></>}

            </div>

            {status != "success" ? <h1>please login firstly</h1> :
              productData != null ?
                <div className="product-detail">

                  <img src={productData.image || productData.images[0]} alt="" />
                  <ul className="product-content">
                    <li>{productData.title}</li>
                    <li> $ {productData.price}</li>
                    <li></li>
                    <li></li>
                  </ul>

                  <ul className='control-bar'>
                    <div className="quantity-section">
                      <button>+</button> <span>56</span><button>-</button>
                    </div>

                    <button className='remove-btn active transition' onKeyPress={(e) => { console.log(e) }}>remove</button>

                  </ul>
                </div>
                : cartData.loading == false ? <h1>hello </h1> :
                  cartData.data.map((item, index) => {
                    return (
                      <div className="product-detail" key={index}>

                        <img src={item.image || item.images[0]} alt="" />
                        <ul className="product-content">
                          <li>{item.title}</li>
                          <li> $ {item.price}</li>
                          <li></li>
                          <li></li>
                        </ul>

                        <ul className='control-bar'>
                          <div className="quantity-section">
                            <button>+</button> <span>5</span><button>-</button>
                          </div>

                          <button className='remove-btn active transition'>remove</button>

                        </ul>
                      </div>
                    )
                  })
            }




          </div>

        </div>





        <div className="price-container">
          <div className="price-detail-section">


            <div className="price-amount-section">
              <div className="heading">price Detail</div>
              <hr />
              <div className="amount-section">

                <ul>
                  <li>price ( item)</li>
                  <li>discount</li>
                  <li>dilvery charge</li>
                </ul>

                <ul>

                  <li></li>
                  <li>52</li>
                  <li>52</li>
                </ul>

              </div>
              <hr />
            </div>
            <div className="checkout-btn flex1">
              <ul>
                <li>total amount</li>
                <li></li>
              </ul>
              <hr />
              <button>checkout</button>
            </div>
          </div>

        </div>

        <div className="mobile-footer-nav">
          <button onClick={() => { navigate(-1) }}>detail</button>
          <button>check out</button>

        </div>
      </div>

    </section>
  )
}


export default Checkout