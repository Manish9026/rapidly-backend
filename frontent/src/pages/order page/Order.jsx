import React, { useState } from 'react'
import './order.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NotFound from '../../component/tools/notFoundPage/NotFound';
import { icons } from '../../asscets/assect';

const filterContent = {
  orderStatus: [["on the way", "delivered", "cancelled", "returned"], ["onWay", "delivered", "cancelled", "returned"]],
  timeLine: [["last 30 days", "last month", "last 3 month", "last year"], ["30_days", "1_month", "3_month", "1_year"]]
}
function Order() {

  const navigate = useNavigate();
  const [orderRecord, setOrderRecord] = useState(1)
  const { status } = useSelector(state => { return state.authuser })



  if (status == 'success') {
    return (
      <div className="order-section">

        <div className="filter-section"  >
          <MobileFilter />
          <div className="filter-container">
            <div className="filter-orders">filter orders</div>
            <div className="filter-list-container">
              <div className="list">
                <div className="order-status">order status</div>
                <ul className="list-property">
                  {
                    filterContent.orderStatus[0].map((item, index) => {


                      return (
                        <label htmlFor={"STF" + index} key={index}>
                          <li className='PRD-list'>
                            <input type="checkbox" name={filterContent.orderStatus[1][index]} id={"STF" + index} />
                            {item}
                          </li>
                        </label>
                      )
                    })
                  }


                </ul>
              </div>

              <div className="list">
                <div className="order-status">order status</div>
                <ul className="list-property">
                  {
                    filterContent.timeLine[0].map((item, index) => {


                      return (
                        <label htmlFor={"LFT" + index} key={index}>
                          <li className='PRD-list'>
                            <input type="checkbox" name={filterContent.timeLine[1][index]} id={"LFT" + index} />
                            {item}
                          </li>
                        </label>
                      )
                    })
                  }


                </ul>
              </div>

            </div>
          </div>
        </div>
        <div className="order-detail-section">
          <div className="search-section">
            <div className="order-search-bar">
              <input type="text" placeholder='search last order' />
            </div>
            <div className="search-btn"> search</div>
          </div>
          <div className="order-detail">
            {
              orderRecord ?
                <div className="order-detail-card">
                  <div className="order-product-detail">
                    <div className="product">
                      <img src="https://4.imimg.com/data4/AQ/FO/MY-28325927/mens-shirt-500x500.jpg" alt="" />
                      <span className='CONTf-js'>
                        <p>Men Slim Fit Solid Spread Collar Formal Shirt</p>
                        <span className="price">
                          399
                        </span>
                      </span>

                    </div>
                  </div>

                  <div className="order-status2 flex">
                    <span style={{ background: "green", padding: "5px", borderRadius: "50%" }}></span>
                    <div className="status ">Order delivered on 21,2023</div>
                  </div>
                </div> :
                <NotFound />
            }
          </div>
        </div>
      </div>

    )
  }
  else {
    navigate("/login")
  }
}

function MobileFilter() {


  const [toggleNav, setToggleNav] = useState(1);
  return (
    <div className="m-order-nav-section">
      <header className="n-av-af" >
        <div className="sub-nav">


          <div className="selct-option">
            <div className="order-1">order1</div>
            <div className="ellipse-1"></div>
          </div>
          <img className="cross-icon" src={icons.cross} />
        </div>
        <img className="filter-icon" src={icons.filterIcon} onClick={() => setToggleNav(prev => !prev)} />
      </header>
      <div className="filter-option" style={toggleNav ? { display: "none" } : { display: "flex" }}>
        <div className="list">
          <div className="order-status">order status</div>
          <div className="list-property">

            {
              filterContent.orderStatus[0].map((item, index) => {

                return (
                  <div className="selct-option" key={index}>
                    <div className="order-1" name={filterContent.orderStatus[1][index]}>{item}</div>
                    <div className="ellipse-1"></div>
                  </div>
                )
              })

            }
          </div>
        </div>

        <div className="list">
          <div className="order-status">order status</div>
          <div className="list-property">

            {
              filterContent.timeLine[0].map((item, index) => {

                return (
                  <div className="selct-option" key={index}>
                    <div className="order-1" name={filterContent.timeLine[1][index]}>{item}</div>
                    <div className="ellipse-1"></div>
                  </div>
                )
              })

            }
          </div>
        </div>
      </div>
    </div>


  )
}

export default Order