import React, { useState } from 'react'
import './Footer.scss'

import facebook from './facebook.png'
import insta from './instagram.png'
import linkedin from './linkedin.png'
import youtube from './youtube.png'
import twiter from './twitter.png'
import {BsInstagram} from 'react-icons/bs'
import {FaFacebookSquare} from 'react-icons/fa'
import {FaTwitterSquare} from 'react-icons/fa'

const Footer = () => {

  return (
    <div className="footer_section ">
         <div className="sub_footer1 flex">
            <div className="left_footer flex">
                <div className="about footer-box">
                    <div className="heading"  >about</div>
                    <div className="content font " >
                    <a className="text font"  href='#'>lorem</a>
                    <a className="text  font" href='#'>lorem</a>
                    <a className="text font" href='#'>lorem</a>
                    <a className="text font" href='#'>lorem</a>
                    <a className="text font" href='#'>lorem</a>
                    </div>
                </div>
                <div className="shop_detail footer-box" >
                      <div className="heading" >shop</div>
                      <div className="content font" >
                        <a className="text font" href='#'>Product Categories</a>
                        <a className="text font" href='#'>special offers or discounts</a>
                        <a className="text font" href='#'>new arrivals</a>
                        <a className="text font" href='#'>popular product or best sellers</a>
                        <a className="text font" href='#'>gift cards</a>
                      </div>
                </div>
                <div className="costomer_service footer-box">
                <div className="heading"  >costumer service</div>
                    <div className="content font" >
                    <a className="text font"  href='#'>lorem</a>
                    <a className="text font" href='#'>lorem</a>
                    <a className="text font" href='#'>lorem</a>
                    <a className="text font" href='#'>lorem</a>
                    <a className="text font" href='#'>lorem</a>
                    </div>
                </div>
                  <div className="support footer-box">
                      <div className="heading"  >support</div>
                      <div className="content font" >
                        <a className="text font" href='#'>lorem</a>
                        <a className="text font" href='#'>lorem</a>
                        <a className="text font" href='#'>lorem</a>
                        <a className="text font" href='#'>lorem</a>
                        <a className="text font" href='#'>lorem</a> 
                        </div>

                  </div>
            </div>
            <div className="right_footer flex">
              <div className="right_footer_child">
                    <div className="contect_us footer-box ">
                    <div className="heading right_heading">connect with us</div>
                  <p className=" right_text font">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem impedit laudantium perfe nesciunt quae doloribus.
                  </p>
                    </div>
                    <div className="mail_us footer-box">
                      <div className="heading">mail us</div>
                      <p className="right_text font">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, sequi.</p>
                    </div>
                    
                    </div>
            </div> 
            
       </div>
      <div className="sub_footer2 flex">
        <div className="left_sub_footer2">
          <div className="heading">connect with us</div>
          <div className="social_icon">
                  <a href="#hello" >
                    <img  src={facebook} alt="" />
                  </a>
                  <a href="https://www.twitter.com/" >
                    <img  src={twiter} alt="" />
                  </a>
                  <a href="https://www.youtube.com/" >
                    <img  src={youtube} alt="" />
                  </a>
                  <a href="#hello" >
                    <img  src={insta} alt="" />
                  </a>
                  <a href="#hello" >
                    <img  src={linkedin} alt="" />
                  </a>
                  
                  </div>
          </div>
       
              <div className="mid_sub_footer2 font">
              © 2023 All rights reserved.
              </div>
            <div className="right_sub_footer2 font">
                created by manish maurya
            </div>
       </div>

       <div className="dev-info">
        <ul>
        <li>copyright © 2023 by <p>manish maurya</p></li>
        <li>all right reserved</li>
        </ul>
       

       </div>
    </div>
  )
}


export default Footer