import React from 'react'
import './Banner.scss'

const Banner = (props) => {
  return (
    <div className="Banner_container">
        <div className="banner_img_section">
            <img src={props.image} alt=""  className='banner-image'/>

        </div>
        <div className="product_discription_section">

        </div>
    </div>
  )
}

export default Banner