import React, { useEffect, useState } from 'react'
import './Login.scss'
import logo from '../header/logo.png'
import { BsLayersHalf } from "react-icons/bs"
import { BsCircleHalf, BsFillArrowRightCircleFill } from "react-icons/bs"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { userVerifier } from '../../slices/authSlice'
import Otp from './otp-box/Otp'
import { loginWithOtp, setOtpNum, setOtpPanel } from '../../slices/otpSlice'
import { icons } from '../../asscets/assect'

axios.defaults.baseURL = process.env.React_App_BASE_URL || "http://localhost:3001"

axios.defaults.withCredentials = true

// state declaration section
const Login = () => {


  const { status } = useSelector(state => { return state.authuser })
  const dispatch = useDispatch();
  const { otpPanel } = useSelector((state) => { return state.otpFeatures })
  const [tc, setTc] = useState(0);

  const navigate = useNavigate();
  const [loginMethod, setloginMethod] = useState({
    method: 0,
    text: "registered mobile no"

  });
  const [messageLog,setMessageLog]=useState({
    iconStatus:null,
    message:"",
    error:null,
    boxStatus:0,
  })

  // const {message,status}=useSelector(state=>{ return state.authuser})


  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
    tc: 0
  })
  const [mobNum, setMobNum] = useState({
    num: "",
    countryCode: "+91"

  });

  // end state declaration section






  const handler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // console.log(name, value)

    setFormData((prev) => {

      return {
        ...prev, [name]: value
      };

    })

  }

  // submit function
  const submitHandler = async (type) => {
 
  
    switch (type) {
      case "loginWithPass":

        if (formData.tc === 0) {
          // alert("click term & condition checkbox")
          toast.warning("click term & condition checkbox", { containerId: "login" });

        }
        else {

          // await dispatch(getlogin(formData));
          axios.post("/api/login?type=loginWithNum", formData).then((res) => {

            if (res.data.status == "success") {
              dispatch(userVerifier());
              navigate(-1)
              toast.success(res.data.message, {
                containerId: "cart",
                theme: 'colored'
              });
            }

            else
              toast.error(res.data.message, {
                containerId: "login",
                theme: 'colored'
              });



          })
          // setNotation("block2")
          setFormData({
            userEmail: "",
            password: "",
            tc: formData.tc
          })


        }
        break;

      case "loginWithOtp":

        if (tc === 0) {
          // alert("click term & condition checkbox")
          toast.warning("click term & condition checkbox", { containerId: "login" });

        } else {
          if (mobNum.num.length != 10) {
            toast.error("Phone number should be 10 digit number.", { containerId: "login" });


          } else {

dispatch(loginWithOtp(mobNum));

            // alert(JSON.stringify(mobNum))
            // dispatch(setOtpNum(mobNum.num))
            // dispatch(setOtpPanel())
          }

        }
        break;
    }

  }



  //end submit function

  //check box function
  const checkboxHandler = (type) => {

    switch (type) {

      case "loginWithPass":
        if (formData.tc === 0) {
          setFormData({
            userEmail: formData.userEmail,
            password: formData.password,
            tc: 1


          })

          // console.log(formData.tc)
        }
        else {
          setFormData({
            userEmail: formData.userEmail,
            password: formData.password,
            tc: 0

          })



        }
        break;

      case "loginWithOtp":
        {
          tc ? setTc(0) : setTc(1);
          
        } break;
    }



  }
  // end check box function


  useEffect(() => {

    if (isNaN(mobNum.num)) {

      toast.warning(" only number allowed", { containerId: "login" });
      {
        setMobNum(((prev) => {

          return {
            ...prev, ["num"]: prev.num.slice(0, prev.num.length - 1)
          };

        }))
      }

   

    }
    if (mobNum.num.length != 10 && mobNum.num.length>0) {
    

      setMessageLog((prev)=>{
        return{
          ...prev,["message"]:"Phone number should be 10 digit number.",["error"]:1,["iconStatus"]:0,["boxStatus"]:1,
        }
      })

    }

    if(mobNum.num.length==10){
      setMessageLog((prev)=>{
        return{
          ...prev,["message"]:"Verified mobile number",["error"]:0,["iconStatus"]:1,["boxStatus"]:1,
        }
      })
    }
    if(mobNum.num.length==0){
      setMessageLog((prev)=>{
        return{
          ...prev,["message"]:"Verified mobile number",["error"]:0,["iconStatus"]:1,["boxStatus"]:0,
        }
      })

      
    }




  }, [mobNum.num])






  const methodChanger = () => {
    if (loginMethod.method === 1) {
      setloginMethod({

        method: 0,
        text: "registered mobile no"
      })
    }
    else {
      setloginMethod({
        method: 1,
        text: "password"
      })

    }

  }

  if (status !== "success") {
    return (
      <div className="login_section " onKeyDown={(e) => { if (e.key === "Enter") submitHandler(); }}>


        <div className="login_wrapper  " >
          <BsLayersHalf className='font-color_change_icon' />
          <BsCircleHalf className='back-color_change_icon' />
          <div className="--heading top_wrapper flex"><img src={icons.logo} alt="" width={"20px"} height={""}/>
            <h3>Login Now</h3>
          </div>

          {
            loginMethod.method ? otpPanel ? <Otp /> : <div className="mid_wrapper flex method1"  >
              <div className="input-container">
            
                <div className="input_field" >

                 
                  <select name="countryCode" id="country_id " autoFocus={true} value={mobNum.countryCode} className='hide_shadow' onChange={(e) => {
                    setMobNum(((prev) => {

                      return {
                        ...prev, [e.target.name]: e.target.value
                      };

                    }))
                    console.log(e.target.value);
                  }}>
                    
                    <option value="+91">+91</option>
                    <option value="+64">+64</option>
                    <option value="+89">+89</option>
                    <option value="+90">+90</option>
                    <option value="+45">+45</option>
                    <option value="+76">+76</option>
                  </select>
                  <input type="text" maxLength={10} className="number hide_shadow " placeholder='Mobile no' name='num' value={mobNum.num} onChange={(e) => {
                    setMobNum(((prev) => {

                      return {
                        ...prev, [e.target.name]: e.target.value
                      };

                    }))
                  }} />
                  
                  </div>

                  <div className="num-checked flex" style={messageLog.boxStatus?{display:"flex"}:{display:"none"}}>
                  <img src={messageLog.iconStatus?icons.correctIcon:icons.inCorrectIcon} alt="" />
                    <h5 className='message-log' style={messageLog.error?{color:""}:{color:"rgb(14, 218, 14)"}}>{messageLog.message}</h5>

                   
                  </div>
                <div className="checkbox-section">
                  <label htmlFor="term" onClick={() => { checkboxHandler("loginWithOtp") }}>
                    <input type="checkbox" checked={tc} className="check" id='term' /><Link to="/" className='font1 link'>term&condition</Link>
                  </label></div>

              </div>


              <button className='--btn btn' onClick={() => submitHandler("loginWithOtp")}>send Otp</button>
            </div> :

              <div className='mid_wrapper flex method2 '>

                <input type="text" className="input_field  " placeholder=' enter email' name="userEmail" onChange={handler} value={formData.userEmail} />
                <input type="password" className='input_field' placeholder='enter password' name='password' onChange={handler} value={formData.password} />
                <div className="checkbox-section"><input type="checkbox" value={formData.tc} className="check" onClick={() => checkboxHandler("loginWithPass")} name='tc' /><Link to="/policy" className='font1 link'>term&condition</Link></div>

                <input type="submit" value="login" className='btn --btn' onClick={() => submitHandler("loginWithPass")} />

              </div>

          }


          <div className="bottom_wrapper ">
            <div onClick={methodChanger} > <BsFillArrowRightCircleFill className='icon' /><p>login with {loginMethod.text}</p></div>

            <div><span className='font1'>new user& </span>
              <Link to="/register" className='font1 link' >register</Link></div>


          </div>

        </div>

        <ToastContainer
          enableMultiContainer
          containerId={"login"}
          className="toast"
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
          transition={Slide}
          theme="light" />

      </div>
    )
  }
  else {
    navigate('/')

  }
}

export default Login