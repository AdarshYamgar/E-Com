import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import "../Auth/loginsignup.css"
import { Link } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
const Register=()=>{
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
              navigate("/")
            },1000)
        }else{
            console.log("Error occured from appContext")
        }
        }
        // if(register(formData)){
        //     console.log("After register")
        //     navigate("/")
        // }else{
        //     console.log("Error occured from appContext")
        // }
    }
    return(
        <>
    {/* <div className='form-container'>
      <form className='register-form'onSubmit={onSubmit}>
  <div className="mb-3">
    <label  className="form-label">Name</label>
    <input type="text"                                  
     className="form-control" 
     name="name" 
     value={name}
      onChange={onChange} 
      placeholder="Name"  
      />
  </div>
  <div className="mb-3">
    <label  className="form-label">Email</label>
    <input type="email" 
    className="form-control"
     name="email" 
     value={email} 
     onChange={onChange} 
     placeholder="Email"  
     />
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" 
    className="form-control" 
    name="password" 
    value={password} 
    onChange={onChange} 
    placeholder="Password"
    />
    
  </div>
    
  <div className="form-group pt-3">
    <label className="form-label">Role : </label>
    
    <select className="form-select" placeholder="Role" name="role" value={role} onChange={onChange}>
    <option value="User">User</option>
        <option value="Admin">Admin</option>
    </select>

  </div>
  <div className='d-flex justify-content-center'>
  <button type="submit" className="w-100 mt-5 btn btn-dark " >Sign-Up</button>
  </div>
  <p className='d-flex justify-content-center'>Have an Account ? <Link to="/" > Login Here</Link> </p>
 
</form>

    </div>  */}
      <div className="form-container">
        <form className="register-form" onSubmit={onSubmit}>
           <div className="loginsignup-container">
            <h1>Sign Up</h1>
            <div className="loginsignup-fields">
              
             
              <input type="text"                                  
                     name="name" 
                     value={name}
                     onChange={onChange} 
                      placeholder="Name"
                      
              />
              {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
            
              <input type="email" 
     name="email" 
     value={email} 
     onChange={onChange} 
     placeholder="Email" 
              />
              {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
              <input type="password"  
                     name="password" 
                     value={password} 
                     onChange={onChange} 
                     placeholder="Password"
              />
              {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
              <select placeholder="Role" name="role" value={role} onChange={onChange}>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              </select>
            </div>
            <button>Continue</button>
            <p className="loginsignup-login">Already have an account?{" "}<Link to="/" className="linkdecor">Login here</Link></p>
            {/* <div className="loginsignup-agree">
            <input type="checkbox" name="" id=""/>
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div> */}
           </div>
       </form> 
       </div>

        </>
    )
}
export default Register;