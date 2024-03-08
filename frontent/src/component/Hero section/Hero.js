import React from 'react'
import "./Hero.scss"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import '../../../node_modules/swiper/swiper-bundle.min.css'

import Banner from './Banner_section/Banner'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import image1 from '../../asscets/banner1.jpg'
import image2 from '../../asscets/banner2.jpg'

import image3 from '../../asscets/banner3.jpg'

import image4 from '../../asscets/banner4.jpg'
import image5 from '../../asscets/banner5.jpg'


const Hero = () => {
  return (
<div className="hero_section flex">

  <div className="Banner_section">
  <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={5}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      autoplay
     
      className="Banner_section"
    >
      <SwiperSlide>  <Banner image={image1} /> </SwiperSlide>
      <SwiperSlide>  <Banner image={image2}  /> </SwiperSlide>
      <SwiperSlide>  <Banner image={image3}  /> </SwiperSlide>
      <SwiperSlide>  <Banner image={image4} /> </SwiperSlide>
      <SwiperSlide>  <Banner image={image5} /> </SwiperSlide>

   
    </Swiper>
 

  </div>

</div>
  )
}

export default Hero