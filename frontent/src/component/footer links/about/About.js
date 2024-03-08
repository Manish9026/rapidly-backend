import React from 'react'

import { useContext } from 'react'
import { useReducer } from 'react'


import './about.css'
// import reducer from '../../../react-hooks/useReducer/reducer'

const initial_value=0;



const About = () => {
//   const [count,dispatch]=useReducer(reducer,initial_value)
//   // const userdata=useContext(Appcontext);
//   // console.log(userdata);

  return (<>
     {/* <div className='section'>my name is {userdata.name} and age is {userdata.age} year </div> */}

     <div className="section">
      about

{/*       
      <button className="btn shadow_hide" onClick={()=>dispatch({type:"inc"})}>+</button>
      {count}
      <button className="btn" onClick={()=>dispatch({type:"dec"})}>-</button> */}
     </div>
 </> )
}

export default About