import React from 'react' 

import './style.scss'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
const Correct = (props) => {
  return (
    <div className="message-section flex success" >
    
    <HiOutlineBadgeCheck className='icon_success' /> 
     <span className='message'>{props.message}</span>
 
   </div>
 
  )
}

export default Correct