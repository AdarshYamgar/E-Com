import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import "../Auth/Login.css"
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Login =() =>{
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
        {/* <form onSubmit={onSubmit}>
            <div>
                <label>Email</label>
                <input type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                />
            </div>
            <div>
                <label>Password</label>
                <input type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"  
                />
            </div>
            <button type="submit">
                  Login
            </button>
           <p>Don't have an account <Link to="/register">SignUp</Link></p>
        </form> */}
       <div className="form-container2">
        <form className="loginsignup2" onSubmit={onSubmit}>
           <div className="loginsignup-container">
              <h1>Log In</h1>
              <div className="loginsignup-fields">
                <input type="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"/>
                    {emailError && <p style={{color:"red"}}>{emailError}</p>}
                 <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"   
                 /> 
                 {passwordError && <p style={{color:"red"}}>{passwordError}</p>}  
              </div>
              <button type="submit">
                  Login
            </button>
           <p className="loginsignup-login">Don't have an account <Link to="/register" className="linkdecor">SignUp</Link></p>
           </div>
        </form>
        </div>
        </>
    )
}
export default Login;


 {/* <form onSubmit={onSubmit}>
            <div><label>Email</label>
    <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" />
            </div>
            <div><label>Password</label>
    <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
            </div>
    <button type="submit"> Login </button>
<p>Don't have an account <Link to="/register">SignUp</Link></p>
        </form> */}

