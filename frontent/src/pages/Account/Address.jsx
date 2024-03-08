import React, { useEffect, useState } from 'react'
import './account page/Account.scss'
import { useDispatch, useSelector } from 'react-redux';
import { addUserAddress, getAddress, removeAddress, updateAddress } from '../../slices/userAddressSlice';
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
const Address = () => {

  let state = [ "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry"];
const {data,status}=useSelector(state=>{return state.addresses})
const [formVisble,setFormVisble]=useState("disable")
const [loader ,setLoader]=useState(true);
const [buttonType,setButtonType]=useState("save")
const [listTogle,setListTogle]=useState({iconDis:"enable",listdis:"menu-active"})
const dispatch=useDispatch();
const [formdata,setFormData]=useState({

  userName:"",
  mainMobileNo:"",
  pincode:"",
  userAddress:"",
  userDistrict:"",
  alterMobileNo:"",
  state:"",
  addressType:"",
  landmark:"",




})


useEffect(()=>{
dispatch(getAddress());
console.log("hello")
},[status,loader])


const formDataHandler=(e)=>{
let value=e.target.value;
let name=e.target.name;
setFormData((prev)=>{
  return{ ...prev,[name]:value}
});




}

const submitHandler=async(e)=>{
e.preventDefault();

 await dispatch(addUserAddress(formdata));
dispatch(getAddress());

}

const removeHandler=(id)=>{
 
dispatch(removeAddress(id));
dispatch(getAddress());
}

const editHandler=(data)=>{
  setFormVisble("enable")
  setButtonType("edit")
  const {userName,state,pincode,mainMobileNo,alterMobileNo,address,addressType,landmark,district,_id}=data;
  setFormData({
    userName,
    mainMobileNo,
    pincode,
    userAddress:address,
    userDistrict:district,
    alterMobileNo,
    state,
    addressType,
    landmark,
    id:_id

  })

console.log("edit data",data)
}

const updateHandler=(e)=>{
// e.preventDefault();
 
  dispatch(updateAddress(formdata));
 setLoader(!loader);
 setFormVisble("disable")

}


  return (
    <div className='address-section' style={{height:"100%"}}>
      <div className="address-container">

       
          <div className="heading">
            <h5>address</h5>

            <label htmlFor="">
              <p  className='new-address active transition' onClick={()=>setFormVisble("enable")}>
                +  add new address
              </p>
            </label>
          </div>


        <div className={`address-form ${formVisble}`}>
  
          <form >

          <div className="heading">
    new address
   </div>
         <div className='first-input-section'>
         <input type="text" name="userName" placeholder='name' value={formdata.userName} required onChange={(e)=>formDataHandler(e)}/>
        <input type="text" name='mainMobileNo' placeholder='moblie no' value={formdata.mainMobileNo} required onChange={(e)=>formDataHandler(e)}/>
        <input type="text" name='pincode' placeholder='pincode' value={formdata.pincode} required onChange={(e)=>formDataHandler(e)}/>
        <input type="text"  />
         </div>
       

        <input type="text" className='second-input-section' placeholder='address (area & street)' value={formdata.userAddress} required name='userAddress' onChange={(e)=>formDataHandler(e)}/>

    <div className='third-input-section'>
       <input type="text" placeholder='city/town/district' required name='userDistrict' value={formdata.userDistrict} onChange={(e)=>formDataHandler(e)}/>
        
        <select name="state" id="" onChange={(e)=>formDataHandler(e)  } value={formdata.state}>
          <option value="">-choose--state</option>
          {
            state.map((item,index)=>{
              return (
                <option value={item} key={index}>{item}</option>
              )
            })
          }
        </select>
        <input type="text" placeholder='near by' name='landmark' onChange={(e)=>formDataHandler(e)} value={formdata.landmark}/>
        <input type="text" placeholder='alternate mobile no' name='alterMobileNo' onChange={(e)=>formDataHandler(e)} value={(formdata.alterMobileNo)}/>
        
        </div>


        <div className="fourth-input-section" >
          <div className="heading">
            address type
          </div>
          <div className="radio-button">
          <span> <input type="radio" name="addressType" id="home" value="home" checked={formdata.addressType=="home"?true:false} onChange={(e)=>formDataHandler(e)}/><label htmlFor="home">home</label></span>
         <span><input type="radio" name="addressType" id="work" value="work" checked={formdata.addressType=="work"?true:false}  onChange={(e)=>formDataHandler(e)} /><label htmlFor="work">work</label> </span>
          </div>
        
          
        </div>

      

        <div className="btn-section">
          {
           buttonType==="save"?<button onClick={(e)=>submitHandler(e)}>save</button>:
          <button onClick={(e)=>updateHandler(e)}>update</button>
          }
          <button onClick={()=>setFormVisble("disable")}>cancel</button>
        </div>
       
          </form>
        </div>

          <div className='saved-address'>
        {


          data.length===0?
          <div className='empty-section'><p>no record found</p></div>
          
          :data.map((item,index)=>{

            return (
 <ul key={index} >
            
            <li className='address-header'>
              <div className='address-tittle'>
                <span>{item.addressType} </span> 
                <p>{item.userName} </p> 
                <p>{item.mainMobileNo}</p>

               </div>

               <div className='btn-section'>
                <button className='active' onClick={()=>removeHandler(item._id)}>remove</button> <button className='active' onClick={()=>editHandler(item)}>edit</button>
               </div>

               <div className="dot-menu" >
              <PiDotsThreeOutlineVerticalLight className={`icon ${listTogle.iconDis}`} onClick={()=>setListTogle({iconDis:"none",listdis:"menu-active"})} />
              <div className={`${listTogle.listdis} list-bar`} >
                <span onClick={()=>setListTogle({iconDis:"block",listdis:"menu-none"})}><RxCross2 className='icon' /></span>
                <li onClick={()=>editHandler(item)}>edit</li>
                <li onClick={()=>removeHandler(item._id)}>remove</li>
              </div>
               </div>
                
             </li >
            <li >{item.address},{item.district},{item.state}, {item.pincode} </li>
           
           </ul>
            )
          })
        }
          
           

          </div>


         

        

      </div>


    </div>
  )
}

export default Address