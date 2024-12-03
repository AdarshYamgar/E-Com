import React, { useContext,useEffect,useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import AppContext from "../context/AppContext";
const Navbar=()=>{
    const [searchTerm,setSearchTerm]=useState("")
    const localtion=useLocation();
    const {products,filteredData,setFilteredData,cart,setCart,}=useContext(AppContext)

   

    const filterbyCategory=(cat)=>{
        console.log("i am inside filterbyCategory",filteredData)
          setFilteredData(products.filter((data)=>data.category.toLowerCase()==cat.toLowerCase()))
    }
    const userRole=JSON.parse(localStorage.getItem("loggedIn"))
    console.log("i am navbar ",userRole)
    const navrole=JSON.parse(localStorage.getItem("user_Login"));
    console.log(navrole )
  
    const navigate=useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault();
        navigate(`/search/${searchTerm}`)
        setSearchTerm("")
    }
    const handleLogout= async()=>{
        Swal.fire({
            title: "Do you really want to logout?",
            text: "Make sure you've saved all your work!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,logout!" 
        }).then((result)=>{
            if(result.isConfirmed){
            const num=JSON.parse(localStorage.getItem("user_Login"))
            Swal.fire({
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                icon: "success"
              }).then(()=>{
                if(num === "Admin"){
                    console.log("I am Admin logout")
                    localStorage.removeItem("user_Login")
                    localStorage.removeItem("User")
                   navigate("/")
        
                }else{
                    console.log("I am User logout")
                    localStorage.removeItem("user_Login")
                    localStorage.removeItem("User")
                    
                    document.body.style.backgroundColor="white"
                }
                console.log("Handle")
          localStorage.removeItem("loggedIn")
          setCart([])
        toast.success("logout successfully ...!",{
            position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        },2000)
       
        navigate("/");
              })
            }
        })
        
        
    }
    return(
        <>
        
                <div className="nav sticky-top">
                   
                <div className="nav_bar ">
                    {/* <div>
                        <img src="https://marketplace.canva.com/EAGHpqF4xz0/1/0/1600w/canva-purple-%26-yellow-illustrative-e-commerce-online-shop-logo-PzcxxJfRApQ.jpg" alt=" " style={{height:"50px" , width:"80px"}}/>
                    </div> */}
            
                    <Link to={"/"} className="left" style={{textDecoration:"none",color:"white"}}>
                        <h3>GadgetPulse</h3>
                    </Link>
                    <form className="search_bar" onSubmit={submitHandler}>
                    <span className="material-symbols-outlined">
search
</span>
                        <input 
                        value={searchTerm}
                         onChange={(e)=>setSearchTerm(e.target.value)} 
                         type="text"
                          placeholder="Search Products..."  />
                    </form>
                    {/* {navrole === "User" &&( */}
                    
                    <div className="right">
                        
                        
                    <Link to="/cart" type="button" className="btn btn-primary position-relative mx-3">
                    <span className="material-symbols-outlined">shopping_cart</span>

                    {cart?.items?.length >0 &&(
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cart?.items?.length}
                            <span class="visually-hidden">unread messages</span>
                          </span>
                        )}
  
</Link>
                      <Link to={"/usedata"} className="btn btn-warning mx-3">UserHistory</Link>
                        <Link to={"/profile"} className="btn btn-warning mx-3">Profile</Link>
                        {/* <Link to={"/login"} className="btn btn-secondary mx-3">Login</Link>
                        <Link to={"/register"} className="btn btn-info mx-3">Register</Link> */}
                       <Link onClick={handleLogout}><button className="btn btn-danger mx-3" >Logout</button></Link>
                
                    </div>
                    </div>
                    {localtion.pathname=="/userproductlist" &&(
                   <div className="sub_bar">
                    <div className="items" onClick={()=>setFilteredData(products)} style={{color:"white"}}>No Filters</div>
                    <div className="items" onClick={()=>filterbyCategory("mobile")} style={{color:"white"}}>Mobiles</div>
                    <div className="items" onClick={()=>filterbyCategory("laptop")} style={{color:"white"}}>Laptops</div>
                    <div className="items" onClick={()=>filterbyCategory("camera")} style={{color:"white"}}>Cameras</div>
                    <div className="items" onClick={()=>filterbyCategory("headphone")} style={{color:"white"}}>Headphones</div>
                    </div>  
                    )}   
            

                </div>
    
       
        
        
            
       
        </>
    )
}
export default Navbar;