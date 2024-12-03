import React,{ useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const LoginDemo=()=>{ 
  const {login,role}=useContext(AppContext);
    const [formData,setFormData]=useState({
        email: "",
        password: "",
    });
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const navigate=useNavigate(); 
    const location=useLocation();
    console.log(location.pathname)
    const {email,password}=formData;

    const validateEmail=(email)=>{
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)){
            setEmailError("Invalid email address")
            return false;
        }else{
            setEmailError(" ")
            return true;
        }
    }

    const validatePassword=(password)=>{
        const minLength = 6;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.length < minLength && password.length!=0) {
            setPasswordError(`Password must be at least ${minLength} characters long.`);
            return false;
          } else if (!specialCharRegex.test(password) && password.length!=0) {
            setPasswordError('Password must contain at least one special symbol.');
            return false;
          } else if(password.length==0){
            setPasswordError("Password field is required")
          }else {
            setPasswordError(" ")
            return true;
          }
    
    }
    const onChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit =async (e)=>{
        e.preventDefault();
        let isValid=true;

        if(!validateEmail(email)){
            //setEmailError("Please enter a valid email address.")
            isValid=false;
        }
        if(!validatePassword(password)){
            isValid=false;
        }
        if(isValid){                
            if(await login(email,password)){
                let pp=JSON.parse(localStorage.getItem("user_Login"))
                console.log("pp is",pp)
                console.log("my role is",role)
                
                    if(pp === "Admin"){
                        navigate("/allproduct")
                    }else{
                        navigate("/")
                    }
            }
           //await login(email,password);
            // let pp=JSON.parse(localStorage.getItem("user_Login"))
            // console.log("pp is",pp)
            // console.log("my role is",role)
            
            //     if(pp === "Admin"){
            //         navigate("/allproduct")
            //         //return{backgroundColor:"red"}
            //     }else{
            //         navigate("/userproductlist")
            //        // document.body.style.backgroundColor = 'black';
            //     }
            
            
           // window.location.reload();
            
        }else{
            console.log("Issue occured from appContext")
        }
    }
  
    return(
        <>
         <div className="container d-flex justify-content-center align-items-center mt-5 ">

      <div className="row min-vh-50  border rounded  border-dark shadow mx-auto"  style={{ width: "100%", maxWidth: "800px",maxHeight:"600px" }}>
        {/* Left Section */}
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center  text-center text-light " style={{backgroundColor:"#de453a"}}>
          <h1 className="display-4">Hello,Friend!</h1>
          <p className="lead mb-3 mt-4">
            Enter your details and start journey with us
          </p>
          <Link to="/register" class="btn" style={{backgroundColor: "#de453a", color: "white", width: "50%" ,border:"2px solid white",borderRadius:"40px"}}>Sign Up</Link>

        </div>

        {/* Right Section */}
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
          <div className="w-75">
            <h2 className="mt-4 mb-5 fs-1 fw-bold text-center">Sign In</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4 ">
                {/* <label htmlFor="email" className="form-label">
                  Email address
                </label> */}
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc',}}

                />
          {emailError && <p className="text-danger">{emailError}</p>}

              </div>
              <div className="mb-3">
                {/* <label htmlFor="password" className="form-label">
                  Password
                </label> */}
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc'}}
                />
                {passwordError && <p className="text-danger">{emailError}</p>}
              </div>
              {/* <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div> */}
              <div className="text-center mt-3 mb-3">
                <Link to="/forgot" className="text-decoration-none">
                  Forgot your password?
                </Link>
              </div>
              <div className="d-flex mb-5 justify-content-center">
              <button type="submit" className="btn" style={{backgroundColor: "#f29a0c", color: "white", width: "50%" ,border:"2px solid white",borderRadius:"40px"}}>
                SIGN IN
              </button>
              </div>
              {/* <div className="text-center mt-3 mb-5">
                <a href="#" className="text-decoration-none">
                  Forgot your password?
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}
export default LoginDemo;