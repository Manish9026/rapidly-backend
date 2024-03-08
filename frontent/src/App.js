import './App.css'
import Footer from './component/footer/Footer';
import {BrowserRouter,Routes,Route, Outlet} from 'react-router-dom'

import Header from './component/header/Header';
import {Slide, ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Category from './component/category/Category';

function App() {
  return (
    <>

<Header/>
<ToastContainer 
enableMultiContainer
className="cart-toast"
position="bottom-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
containerId={'cart'}

transition={Slide}
theme="light"/>
<Category/>

<Outlet/>

<Footer/>


  </>
 
 
    
  );
}

export default App;
