import React, { useRef, useState } from 'react'
import './otp.css'
import { useDispatch, useSelector } from 'react-redux'
import { removeOtpPanel, removeOtpState, setOtpPanel } from '../../../slices/otpSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { userVerifier } from '../../../slices/authSlice';
import  Timer from '../../tools/timer/Timer';
import { useEffect } from 'react';
import { icons } from '../../../asscets/assect';
axios.defaults.baseURL = process.env.React_App_BASE_URL || "http://localhost:3001"

const Otp = () => {
  const navigate=useNavigate();

    const [otpField,setOtpField]=useState(new Array(6).fill(""));
    const [outline,setOutline]=useState(new Array(6).fill(0));
    const {num,otp}=useSelector((state)=>{return state.otpFeatures})
    const [isPasteAble,setIsPasteAble]=useState(1)
    const dispatch=useDispatch();
    const inputRefs=useRef([]);

           

    useEffect(()=>{

      if(inputRefs[0]){
        inputRefs[0].focus();
        console.log( inputRefs)
      }
    },[])
  

    const handleChange=(e,indx)=>{
    
     
        if(isNaN(e.target.value)) return false
  // console.log("handl+el change")

  if(isPasteAble){
    setOtpField([...otpField.map((data,index)=>(index===indx?e.target.value:data))]);



    if(e.target.value && e.target.nextSibling){
      e.target.nextSibling.focus();
      
  }

  if(e.target.value){

      setOutline([...outline.map((data,index)=>(index==indx)?1:data)])

  }
  
  
}

   
  
        

        // console.log(e)
      
        setIsPasteAble(1);

    }

    const handleKeyUp=(e,indx)=>{
        
   
        if(e.key=='Backspace' ){
          setOtpField([...otpField.map((data,index)=>(index===indx?"":data))]);
          if(e.target.previousSibling)
            e.target.previousSibling.focus();
            setOutline([...outline.map((data,index)=>(index==indx)?0:data)])
        }
      
      

    }


    
 const handlePaste=async(e)=>{
      
      const text=e.clipboardData.getData("text");
let i=0;
await setIsPasteAble(0)
      
const nextCounters = otpField.map((c, indx) =>indx==i?text.charAt(i++):c);
await setOtpField(nextCounters);
 setOutline(outline.map((data,indx)=>1))


  
 }

  const submitHandler=()=>{
     let userOtp=otpField.join("");

     if(userOtp==otp){
      
      axios.post("/api/login?type=loginWithOtp",{num}).then(res=>{
       if( res.data.status){
        dispatch(removeOtpState());
        dispatch(userVerifier());
        toast.success(res.data.message,{containerId:"cart"});
        navigate('/');
       }
       else{
       
        toast.error(res.data.message,{containerId:"login"});
       }
      })
     }
     else{
      toast.error("Wrong OTP",{containerId:"login"})
    
   
     }
   
  }

  
  
  return (
    <section className='otp-section' onPasteCapture={(e)=>{handlePaste(e);console.log("hello")}}>
      
  <div className="container5">
  <img className="paste-icon" src={icons.pasteIcon} alt="" width="30px" height={"30px"} 
  onPaste={(e)=>{handlePaste(e);console.log("hello")}}/>
    <div className='flex' style={{justifyContent:"center",gap:"5px",textTransform:"capitalize"}}>send to<h4 style={{color:"white"}}> {num}</h4></div>
    <h1 className="title">Enter OTP</h1>
    <form id="otp-form" >
    {
        otpField.map((item,index)=>{
            return(
                <input type="text" className={`otp-input ${outline[index]==1?"filled":""}`}
                ref={(input)=>(inputRefs[index]=input)}
                 maxLength={1}
                 key={index}
                 value={item}
                defaultChecked="true"
                
                
                onKeyUp={(e)=>{handleKeyUp(e,index)}}
                onChange={(e)=>{handleChange(e,index)}}
               

            />
            )
        })
    }
     
      
    </form>
    <div className='num-change  flex'>
        <button  className="otp-section-btn " onClick={()=>{dispatch(removeOtpPanel()); dispatch(removeOtpState())}}>change number</button>
        <div className="counter"><Timer/></div>
    </div>
    <button id="verify-btn" onClick={()=>{submitHandler()}}>Verify OTP</button>
  </div>
</section>
  )
}
export default Otp