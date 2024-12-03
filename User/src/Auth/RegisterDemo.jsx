import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import "../Auth/loginsignup.css"
import { Link } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
const RegisterDemo=()=>{ 
    const navigate=useNavigate();
    const location=useLocation();
    console.log(location.pathname)
    const [errors,setErrors]=useState({});
    const {register}=useContext(AppContext);
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"User",
    });

    const {name,email,password,role}=formData;
    const validate=()=>{
      const errors={};
      const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const re = /^[A-Za-z]+$/;
      const mo=/^[0-9]{10}$/;
      const minLength = 6;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

      if(!name){
        errors.name="Name is required";
      }else if(name.length<3){
        errors.name="Name must be atleast 3 characters";
      }else if (!re.test(name)){
        errors.name="Invalid name";
      }

      if(!email){
        errors.email="Email is required";
      }else if(!pattern.test(email)){
        errors.email="Email address is invalid";
      }

      if(!password){
        errors.password="Password is required";
      }else if(!specialCharRegex.test(password)){
        errors.password="Password must contains atleast one special symbol";
      }else if(password.length<minLength){
        errors.password=`Password must be atleast ${minLength} character long`;
      }
      return errors;
    }

    const onChange=(e)=>setFormData({...formData,[e.target.name]:e.target.value});
    const onSubmit= async(e)=>{
        e.preventDefault();
        const validationErrors=validate();

        if(Object.keys(validationErrors).length>0){
          setErrors(validationErrors)
        }else{
          if(await register(formData)){
            console.log("After register")
            setErrors({})
            setTimeout(()=>{
              navigate("/login")
            },1000)
        }else{
            console.log("Error occured from appContext")
        }
        }
      
    }
  
  
    return(
        <>
         <div className="container d-flex justify-content-center align-items-center mt-5 ">

      <div className="row min-vh-50  border rounded  border-dark shadow mx-auto"  style={{ width: "100%", maxWidth: "800px",maxHeight:"600px" }}>
        {/* Left Section */}
           

        {/* Right Section */}
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
          <div className="">
            <h2 className="mt-3 mb-3 fs-1 fw-bold text-center d-flex">Create Account</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-4 ">
              
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc',}}

                />
                 {errors.name && <p className="text-danger">{errors.name}</p>}


              </div>
              <div className="mb-3">
                {/* <label htmlFor="password" className="form-label">
                  Password
                </label> */}
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc'}}
                />
               {errors.email && <p className="text-danger">{errors.email}</p>}

              </div>
              <div className="mb-4 ">
              
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className="form-control"
                id="password"
                placeholder="Password"
                style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc',}}

              />
              {errors.password && <p className="text-danger">{errors.password}</p>}

            </div>
            <div className="form-group mb-3">
    
    {/* <select className="form-select" placeholder=""  name="role" value={role} onChange={onChange}
                    style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc',}}

    >
    <option value="">Select Role</option>
    <option value="User">User</option>
    <option value="Admin">Admin</option>
   
    </select> */}
  </div>
              
              <div className="d-flex mb-4 mt-5 justify-content-center">
              <button type="submit" className="btn" style={{backgroundColor: "#f29a0c", color: "white", width: "50%" ,border:"2px solid white",borderRadius:"40px"}}>
                SIGN UP
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

        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center  text-center text-light " style={{backgroundColor:"#de453a"}}>
          <h1 className="display-4">Welcome Back!</h1>
          <p className="lead mb-3 mt-4">
            To keep connected with us please login with your personal info .
          </p>
          <Link to="/login" class="btn" style={{backgroundColor: "#de453a", color: "white", width: "50%" ,border:"2px solid white",borderRadius:"40px"}}>Sign In</Link>

        </div>
      </div>
    </div>
        </>
    )
}
export default RegisterDemo;