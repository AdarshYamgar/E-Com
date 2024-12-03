import React, { useContext, useState } from "react"
import AppContext from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";''


const ForgotPass=()=>{
  const navigate=useNavigate();
   const {forgotPass}=useContext(AppContext)

  const [email,setEmail]=useState("");
    
  const onChange=(e)=>{
      setEmail(e.target.value)
  }
   
    const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log("email is",email)
      if(await forgotPass(email)){
        console.log("Forgot Password Pass")
        setTimeout(()=>{
          navigate("/reset")
        },2000)

        
      }else{
        console.log("Forgot Password Fail")
      }
      localStorage.setItem("ForgotPasswordEmail",String.raw`${email}`)

               
    }
    return(
        <>
         <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="row min-vh-50  border rounded  border-dark shadow mx-auto"  style={{ width: "100%", maxWidth: "900px",maxHeight:"900px" }}>
            <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center  text-center text-light " >
              <img src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?t=st=1732612104~exp=1732615704~hmac=7095d21c52e657ec3a56990df2f82f7897d98121e9685df233d2c1ec354df33c&w=740" className="w-100 h-100"/>
      </div>
      <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center" >
        <h3 className="text-center mb-4 fw-bold fs-2">Forgot Your Password?</h3>
        <p className="text-muted text-center mb-4 fs-5 ">Enter your email address to reset your password.</p>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4 col-sm-17 col-md-17">
            {/* <label htmlFor="email" className="form-label">
              Email Address
            </label> */}
            <input
              type="email"
              className="form-control "
              value={email}
              name="email"
              id="email"
              placeholder="Enter your email"
            
              onChange={onChange}
            
              required
              
                  style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc',}}
            />
          </div>
          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Generate OTP
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none">
            Back to Login
          </Link>
        </div>
      </div>
     
    </div>
    </div>

        </>
    )
}
export default ForgotPass;