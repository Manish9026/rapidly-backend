import React, { useEffect, useState } from 'react'
import './timer.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginWithOtp, reStartTime } from '../../../slices/otpSlice';
const Timer = () => {


    const {time,num,countryCode}=useSelector(state=>{return state.otpFeatures})
    const [timer, setTimer] = useState(time*60*1000);
    const [second, setSecond] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [timePer,setTimePer]=useState(100);
    const  dispatch=useDispatch();
    const [btnDisable,setBtnDisable]=useState(false)

    useEffect(() => {

        let i;

        if (timer >= 0) {

        setBtnDisable(true)
             i = setTimeout(() => {
                setTimer(timer - 1000)
                formattedTIme();
            }, 1000)

           

        }
        if(timer==0){
            setBtnDisable(false)

        }
        
        return () => {

            clearTimeout(i);

        }

    }, [timer])


    const formattedTIme = () => {

        let fsecond = parseInt(Math.floor(timer / 1000))
        let fmin = parseInt(Math.floor(fsecond / 60));
        // console.log(fmin, fsecond);

        setSecond(fsecond % 60);
        setMinutes(fmin % 60);

        let test=timer/parseInt(time*60*1000)*100
        setTimePer(parseInt(test));


    }

  
    return (
        <div className='timer-section flex'>

            <button className='resend-btn otp-section-btn' 
            disabled={btnDisable}
            onClick={()=>{
               
              
                dispatch(loginWithOtp({num,countryCode}))           
                setTimer(time*60*1000);
            
            }}
            style={btnDisable?{backgroundColor:"#fff9f926",cursor:"not-allowed"}:{backgroundColor:"",cursor:"pointer"}}
            > resend</button>
          

            <div className="cirular-process-bar">
                <div className="outer-circle" 
                style={{background:`conic-gradient(${timePer>=40?timePer>=70?`rgb(10, 247, 57) ${timePer}%`:`rgb(45, 48, 238) ${timePer}%`:`rgba(233, 42, 20, 0.895) ${timePer}%`}${timePer}%,rgba(128, 128, 128, 0) 0deg)`}}>

                    <div className="inner-circle">
                    <div className='timer'>{minutes}:{second}</div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer