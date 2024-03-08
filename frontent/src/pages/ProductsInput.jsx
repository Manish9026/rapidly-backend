import React, { useState } from 'react'
import './test.css'
import { BiLogIn } from 'react-icons/bi';
import { categories } from './category';
import {  toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const ProductsInput = () => {
const [formData,setFormData]=useState({
  title:"",
  price:"",
  discountPercentage:"",
  description:"",
  stock:"",
category:"",
brand:"",
  images:[],

});
const [image,setImage]=useState();

const [count,setCount]=useState(0);


const uploadHandler=(e)=>{
e.preventDefault();
// setImageSet([...imageSet,image]);

setFormData({...formData,images:[...formData.images,image]})

setImage("");
// console.log(formData);
}


const submitHandler=(e)=>{
  e.preventDefault();


  axios.post("/api/v1/product",{formData}).then(res=>{

    if(res.data.status){
      toast.success(res.data.message, {
        containerId: "cart",
        theme: 'colored'
      });
      
    }
    else{
      toast.error(res.data.message, {
        containerId: "cart",
        theme: 'colored'
      });
    }
  }).catch(err=>{

  })

  // console.log(imageSet)
  console.log(formData);
}
  return (
    <div className='entry-section'>
     
        <form action="">

       
<input type="text" placeholder='product-name' value={formData.title} onChange={(e)=>{setFormData({...formData,title:e.target.value})}}/>
<input type="number" placeholder="price" value={formData.price} onChange={(e)=>{setFormData({...formData,price:e.target.value})}}/>
<input type="text"  placeholder=" product-Discripction" value={formData.description}  onChange={(e)=>{setFormData({...formData,description:e.target.value})}}/>
<input type="number"  placeholder="product-discount-persentage" value={formData.discountPercentage}  onChange={(e)=>{setFormData({...formData,discountPercentage:e.target.value})}}  />
<input type="number"  placeholder="product-stock" value={formData.stock}  onChange={(e)=>{setFormData({...formData,stock:e.target.value})}} />
<input type="text"  placeholder="product-brand"  value={formData.brand}  onChange={(e)=>{setFormData({...formData,brand:e.target.value})}} />

<span className='input-category-section'>

  
<input type="text"  placeholder="product-category"  value={formData.category}  onChange={(e)=>{setFormData({...formData,category:e.target.value})}}/>


<select name="category" id='CATG' onChange={(e)=>{setFormData({...formData,category:e.target.value})}} >
  <option value="">--choose-category</option>
  {
    categories.map((item,index)=>{
      return( <option value={item} key={index}>{item}</option>)
    })
  }
</select>

</span>




<span className='image-input-section'>

<div className='image-input'>
<input type="text"  placeholder="product-images" value={image} onChange={(e)=>{setImage(e.target.value)}}  />

<button onClick={(e)=>{uploadHandler(e)}}> upload</button>
</div>

<div  className='upload-image-list'>

  {
formData.images.map((item,index)=>{
    return( 
      <span key={index}>{index+1}. {item}</span>
    )
  })
} 
</div>

</span>
  

{/* <input type="text"  placeholder="product-images" /> */}

 
 <input type="submit" value="submit" onClick={(e)=>{submitHandler(e)}}/>

 <button className="reset-btn" onClick={(e)=>{e.preventDefault();setFormData({  title:"",
  price:"",
  discountPercentage:"",
  description:"",
  stock:"",
category:"",
brand:"",
  images:[],})}}>reset</button>
        </form>


    </div>
  )
}

export default ProductsInput