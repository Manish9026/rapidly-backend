import React, { useState } from 'react'

const Profile = () => {

const [disable,setDisabled]=useState("disabled");
  return (
    <div className='profile-container flex1'>


{/* userName feild layout */}
<ul className='sub-container1 '> 
  <div className="heading"><p>personal detail</p> <button className='edit-btn'> Edit</button> <button className='save-btn  '>save</button></div>
  <form action="" className='flex1'>


    <li className='gap flex1'>
    <p className='sub-heading'>your name</p>
    <input type="text" value="hello" className='input-field' />
    </li>

    <div className="userGender-section gap"> 
    <h5 className='sub-heading'>your gender</h5>
   <ul>  
    <li><label htmlFor="male">male</label> <input type="radio" name="gender" id="male" value="male" /></li>
    <li><label htmlFor="female">female</label><input type="radio" name="gender" id="female" value="female" /></li>
    <li><label htmlFor="other">other</label>   <input type="radio" name="gender" id="other" /></li>
  </ul>
  

      </div>

  </form>
</ul>
     
<ul className='sub-container2'>
<div className="heading"><p>Email Address</p>  <button className='edit-btn'> Edit</button> <button className='save-btn'>save</button></div>
<input type="text" name="" id="" placeholder='useremail' className='input-field'/>
  
  </ul>     
    

<ul className='sub-container3'>
<div className="heading"><p>Mobile Number</p> <button className='edit-btn'> Edit</button> <button className='save-btn'>save</button></div>
<input type="text" name="" id="" placeholder='useremail' className='input-field' />
  
</ul>




    </div>
  )
}

export default Profile