import React, { useState } from 'react'
import './Account.scss'
import {Link, useNavigate} from 'react-router-dom'
import {BsBoxSeam} from 'react-icons/bs'
import {BiSolidUser} from 'react-icons/bi'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Address from '../Address'
import Profile from '../Profile'
import Document from '../Document'
import {AiOutlinePoweroff} from 'react-icons/ai'
import { userLogout, userVerifier } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux'

const Account = () => {
// const [removeCookie]=useCookies([]);

const dispatch=useDispatch();
const {userName,status}=useSelector(state=>{return state.authuser})
const navigate=useNavigate();
const[num,setNum]=useState(1)

const [option,setOption]=useState("address")
const optionChanger=(value,cssClass)=>{
setOption(value);
}










if(status==="success"){
  return (
    <section className="account-section flex1">
      <div className="account-container ">


        <div className="Account-option-bar flex1">
          <div className="user-profile">
            <div className="user-container">
              <div className='user-image'>

              <img src="" alt="" />
              </div>
              
              <p><li>hi,</li>
              <li>{userName}</li></p>
            </div>

          </div>

          <div className="option-wrapper">
               <Link to='/order'><ul className='button-link'> <h2 ><BsBoxSeam className='icon'/><p >order detail</p></h2></ul></Link>

               <ul>
                <h2> <BiSolidUser className='icon'/><p>Account Setting</p></h2>
                <div className="option-list">

                <li onClick={()=>optionChanger("profile",1)} ><Link to="" ><p>profile</p></Link></li>
               <li onClick={()=>optionChanger("address",2)}><Link to=""><p>manage address </p></Link></li>
               <li onClick={()=>optionChanger("document",3)}> <Link to=""><p>documents</p></Link> </li>
                </div>
              
               </ul>

               <ul className='button-link' onClick={()=>  dispatch(userLogout())}><h2 ><AiOutlinePoweroff className='icon'/> <p >Logout</p></h2></ul>
          </div>

        </div>




        <div className="Account-detail-bar">
 
 {
  option==="profile"?<Profile/>:option==="address"?<Address/>:option==="document"?<Document/>:<Profile/>
 }

        </div>

      </div>
    </section>

  )}
  else{
navigate('/login')
  }
}

export default Account