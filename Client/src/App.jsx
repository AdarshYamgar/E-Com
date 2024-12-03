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
import AllExpense from './Pages/AllExpense';
import ForgotPass from './Pages/ForgotPass';
import OtpVerify from './Pages/OtpVerify';
import LoginDemo from './Auth/LoginDemo';
import RegisterDemo from './Auth/RegisterDemo';
import Nav from "../src/Pages/Nav";


const App=()=> {

  return (
    <Router>
      <BlockBackButton/>
      {/* <Navbar/> */}
      <Nav/>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginDemo/>}/>
        <Route path='/register' element={<RegisterDemo/>}/>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path="/allproduct" element={<ProductList/>}/>
        <Route path='/userproductlist' element={<UserProductList/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path='/search/:term' element={<SearchProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/address' element={<Address/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path='/orderconfirmation' element={<OrderConfirmation/>}/>
        <Route path='/confetti' element={<ConfettiCelebration/>}/>
        <Route path='/allorders' element={<AllOrders/>}/>
        <Route path='/allexpense' element={<AllExpense/>}/>
        <Route path='/forgot' element={<ForgotPass/>}/>
        <Route path='/reset' element={<OtpVerify/>}/>
      </Routes>
    </Router>
    
  
  )
}

export default App
