import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Register from './Auth/Register';
import Login from './Auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './Products/AddProduct';
import ProductList from './Products/ProductList';
import Navbar from './Pages/Navbar';
import UserProductList from './Pages/UserProductList';
import ProductDetail from './Pages/ProductDetail';
import { ToastContainer, toast } from 'react-toastify';
import SearchProduct from './Pages/SearchProduct';
import Cart from "./Pages/Cart";
import Profile from './Pages/Profile';
import Address from './Pages/Address';
import Checkout from './Pages/Checkout';
import Footer from './Pages/Footer';
import OrderConfirmation from './Pages/orderConfirmation';
import ConfettiCelebration from './Pages/ConfettiCelebration';
import AllOrders from './Pages/AllOrders';
import BlockBackButton from './Pages/BlockBackButton';
import UserOrders from './Pages/UserOrders';
import Nav from './Pages/Nav';
import NavScrollExample from './Pages/Nav';
import LoginDemo from './Auth/LoginDemo.jsx';
import RegisterDemo from './Auth/RegisterDemo.jsx';
import ForgotPass from './Pages/ForgotPass.jsx';
import OtpVerify from './Pages/OtpVerify.jsx';
import ImgSlider from './Pages/ImgSlider.jsx';
import UserProfile from './Pages/UserProfile.jsx';

const App=()=> {

  return (
    <Router>
      {/* <BlockBackButton/> */}
      {/* <Navbar/> */}
      <NavScrollExample/>
      {/* <ImgSlider/> */}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<UserProductList/>}/>
        <Route path='/register' element={<RegisterDemo/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path="/allproduct" element={<ProductList/>}/>
        <Route path='/login' element={<LoginDemo/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path='/search/:term' element={<SearchProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/address' element={<Address/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path='/orderconfirmation' element={<OrderConfirmation/>}/>
        <Route path='/confetti' element={<ConfettiCelebration/>}/>
        <Route path='/allorders' element={<AllOrders/>}/>
        <Route path='/usedata' element={<UserOrders/>}/>
        <Route path='/forgot' element={<ForgotPass/>}/>
        <Route path='/reset' element={<OtpVerify/>}/>
        <Route path='/prof' element={<UserProfile/>}/>
      </Routes>
    </Router>
    
  
  )
}

export default App
