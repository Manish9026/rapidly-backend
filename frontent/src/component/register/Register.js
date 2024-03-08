import React, { useState } from 'react'


import './Register.scss'
import { Link } from 'react-router-dom'
import image from '../../asscets/register.jpg'
import axios from "axios"

import { HiOutlineBadgeCheck } from "react-icons/hi"
import { BsPatchExclamationFill } from 'react-icons/bs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// axios.defaults.baseURL = "http://192.168.6.107:3001/"
axios.defaults.baseURL =process.env.React_App_BASE_URL



const Register = () => {



  const [message, setMessage] = useState("hello")
  const [message_section, setMessage_section] = useState("none")


  const [status, setStatus] = useState("none");
  const [status1, setStatus1] = useState("block");
  const [status2, setStatus2] = useState("");
  const [textBox, setTextBox] = useState("success")
  const [countryCode, setCountryCode] = useState();


  const [form_data, setForm_data] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    countryCode: "+91",
    password: ""
  });


  const handler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    //console.log(`name ${ name},value ${value}`)
    // console.log(name,value);

    setForm_data((prev) => {
      // alert(JSON.stringify(prev))
      console.log(`privious data : ${prev}`)
      return {
        ...prev, [name]: value
      };

    })

  }

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(form_data);
   setTimeout(changeHandler,5000);
    axios.post("api/register", { form_data }).then(result => {//alert(JSON.stringify(result.data))
      setMessage(result.data.message)

      if (result.data.status === "success") {
        setStatus1("none");
        setStatus("block");
        setStatus2(1)
        setMessage_section("block")
        setTextBox("message-section flex success")



        setForm_data({
          userName: "",
          userEmail: "",
          userMobile: "",
          countryCode: "+91",
          password: ""
        })


      }
      else {
        setMessage_section("block")
        setStatus2(0)
        setTextBox("message-section flex failed")

      }
    }).catch(err => { alert(err) })






  }



  const changeHandler = async (e) => {



    setMessage_section("none");
    // setStatus("none")

    // setStatus1("block")
  }



  return (

    <div className='register-section flex '>



      <div class="container1 " id='none'>

        <div class="contain"> thank you,{form_data.userName}</div>
        <div class="new">your {message}</div>

        <button onClick={changeHandler}> close</button>

      </div>
      <div className="register-container  flex" >
        <div className="left-side">
          <div className="image-section">
            <img src={image} alt="" className="image-section" />
          </div>
          <div className="discripstion-section">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
          </div>
        </div>

        <div className="right-side">
          <div className="register-page-heading">Register</div>
          <div className="">
            {/* userName,userEmail,userMobile,password */}
            <form onSubmit={submitHandler} className="top">
              <h6>Enter name</h6>
              <input type="text" placeholder='first and last name' value={form_data.userName} className='input-field hide_shadow' name='userName' onChange={handler} />
              <h6>Enter Emaiil</h6>

              <input type="email" placeholder=' email' value={form_data.userEmail} className='input-field hide_shadow' name='userEmail' onChange={handler} />
              <h6>mobile no</h6>
              <div className="number-section">
                <select name="countryCode" id="country_id " className='hide_shadow country-code' onChange={handler}>
                  <option value="+91">+91</option>
                  <option value="+64">+64</option>
                  <option value="+45">+45</option>
                  <option value="+89">+89</option>
                  <option value="+90">+90</option>
                  <option value="+76<">+76</option>
                </select>
                <input type="text" placeholder='mobile number' value={form_data.userMobile} className='input-field hide_shadow ' name='userMobile' onChange={handler} />

              </div>
              <h6>password</h6>
              <input type="password" name="password" id="" value={form_data.password} className='input-field hide_shadow' placeholder='password' onChange={handler} />
              <p className='verification-text'> Passwords must be at least 6 characters.</p>




              <input type="submit" value="submit" className=' hide_shadow submit-btn btn' />


            </form>
          </div>

          <div className="bottom ">


            <div className="link-section">


              <div className={textBox} id={message_section}>
                {

                  status2 ? <HiOutlineBadgeCheck className='icon_success' /> : <BsPatchExclamationFill className='icon_failed' />
                }

                <span className='message'>{message}</span>

              </div>

              <span className='font1 flex login-link'>Already have an account?
                <Link to="/login" className='font1 link'  >Sign in</Link></span>


            </div>
          </div>

        </div>

      </div>






    </div>
  )
}

export default Register