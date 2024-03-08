import React from 'react'
import { icons } from '../../../asscets/assect'
import './notFound.css'
const NotFound = () => {
  return (
    <div className="n-tf-10">
  <img className="img-box" src={icons.notFound} />
  <h4 className="txt-box">Sorry? No result found</h4>
  <button className="home-btn">
    <a className="link-txt" href='/'>go to home</a>
  </button>
</div>

  )
}

export default NotFound