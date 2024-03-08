import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './tracker.scss'
const Tracker = ({circleNum=3,content,selectValue=0}) => {



  const ranger = useRef();
  const [selectedValue, setSelectedValue] = useState(selectValue)
  // useMemo(()=> { 
  //   return setSelectedValue(selectValue)},[selectValue])
  const [arr, setArr] = useState(Array(circleNum).fill("0"))
  const [len, setLen] = useState(arr.length);
  const [parentWidth, setParentWidth] = useState({
    allWidth: 0,
    eachWidth: 0,
    circleWidth: 0
  });
  useEffect(() => {
    let penWidth = ranger.current.parentNode.clientWidth;
    setParentWidth(prev => { return { ...prev, allWidth: penWidth, eachWidth: Math.floor(penWidth / (len - 1)), circleWidth: ranger.current.nextSibling.clientWidth } });
    console.log("hello")
  }, [])
  useEffect(() => {

    // setSelectedValue(selectValue)
    if (selectedValue < len && selectedValue > 0) {


      ranger.current.style.width = `calc(${(selectedValue * parentWidth.eachWidth)}px )`;

    }
    else if (selectedValue < 0) {
      setSelectedValue(0)



    }
    else if (selectedValue == 0) {

      ranger.current.style.width = `calc(${(selectedValue * parentWidth.eachWidth)}px )`;
    }
    else {


      setSelectedValue(len - 1)

    }
  },[selectedValue])

  useEffect(()=>{
   
  
    setSelectedValue(selectValue)

  


  },[selectValue])


  const increase = () => {
    setSelectedValue(prev => prev + 1)
    console.log(parentWidth, ranger)
    console.log(arr)
    console.log(ranger);




  }

  const decrease = () => {
    setSelectedValue(prev => prev - 1)
    // console.log(ranger)
    console.log(arr)
  }
  return (
    <div className='tracker-section flex'>
{selectValue}
      <div className="tracker"  >sdhgs
        <ul>
          <span className='line' ref={ranger}></span>
          {
            arr.map((item, index) => {



              return (
                <li key={index} className={selectedValue >= index ? "success" : "unsuccess"} > </li>

              )



            })
          }
          {/* <li  className={selectedValue>=25?"success":"unsuccess"}></li>
        <li className={selectedValue>=50?"success":"unsuccess"}></li>
        <li className={selectedValue>=75?"success":"unsuccess"}></li> */}
        </ul>
        <button onClick={() => { increase() }}> increase</button>
        <button onClick={() => { decrease() }}> decrease</button>


      </div>



    </div>
  )
}

export default Tracker