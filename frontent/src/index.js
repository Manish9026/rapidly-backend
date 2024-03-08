import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'

import { store } from './store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { createBrowserRouter } from 'react-router-dom';
import Header from './component/header/Header';
import Home from './component/home/Home';
import Login from './component/login/Login';
import Category from './component/category/Category';
import About from './component/footer links/about/About';
import Contact from './component/footer links/contact/Contact';

import Register from './component/register/Register';
import Policy from './component/footer links/privacy&policy/Policy';
import Cart from './component/cart/Cart';
import Single_page from './component/single_product_page/Single_page';

import Profile from './pages/Account/Profile';
import Address from './pages/Account/Address';
import Account from './pages/Account/account page/Account';
import Order from './pages/order page/Order';
import Product from './pages/product page/Product';
import Checkout from './pages/checkout page/Checkout';
import Translater from './pages/translater/Translater';
import Search from './pages/Search page/Search';
import ProductsInput from './pages/ProductsInput';
import Tracker from './component/tools/tracker/Tracker';




const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },


      { path: 'catagory', element: <Category /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'register', element: <Register /> },
      { path: 'privacy&policy', element: <Policy /> },
      { path: 'cart', element: <Cart /> },
      { path: 'single_page', element: <Single_page /> },
      { path: 'account', element: <Account /> },
      { path: 'order', element: <Order /> },
      { path: 'account/profile', element: <Profile /> },
      { path: 'account/address', element: <Address /> },
      { path: 'product', element: <Product /> },
      { path: 'login', element: <Login /> },
      { path: "checkout", element: <Checkout /> },
      { path: "translater", element: <Translater /> },
      { path: "address", element: <Address /> },
      { path: "en/products", element: <ProductsInput /> },
      { path: "tracker", element: <Tracker /> },








    ]
  }, { path: "search-product", element: <Search /> },



])

root.render(
  <Provider store={store}>


    <RouterProvider router={router} />

  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

