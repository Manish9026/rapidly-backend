import React from 'react'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import './style.scss'


const Wrong = (props) => {
  return (

    <div className="message-section flex failed" >
  
   <HiOutlineBadgeCheck className='icon_failed' /> 
    <span className='message'>{props.message}</span>

  </div>

  )
}

export {Wrong}