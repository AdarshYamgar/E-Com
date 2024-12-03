import React, { useContext,useEffect,useState } from "react";
import {OtpInput} from "reactjs-otp-input";
import AppContext from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

const OtpVerify = () => {
    const navigate=useNavigate();
    const {ResetPass}=useContext(AppContext)

  const [otp, setOtp] = useState("");
  const [email,setEmail]=useState(localStorage.getItem("ForgotPasswordEmail"))
  const [NewPass,setNewpass]=useState("")
  const [timeLeft,setTimeLeft]=useState(10*60);
  useEffect(()=>{
    if(timeLeft <=0){
      return;
    }
    const timer=setInterval(()=>{
      setTimeLeft((prev)=>prev-1);
    },1000);
    return ()=>clearInterval(timer);

  },[timeLeft])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // alert(`Entered OTP: ${otp} ${email} ${NewPass}`);
    console.log("Otp is",otp)
    
    if(await ResetPass(otp,email,NewPass)){
        console.log("reset Pass")
        setTimeout(()=>{
          navigate("/login")
        },2000)

    }else{
        console.log("reset Fail")
    }
    // Add OTP verification logic here
  };   

  return (
    <div className="container d-flex justify-content-center align-items-center " style={{marginTop:"20px"}} >
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "450px" }}>
        <img src="https://media.istockphoto.com/id/1314193433/vector/envelope-with-approved-document-email-confirmation-document-with-check-mark-in-open-letter.jpg?s=612x612&w=0&k=20&c=yWcI4GIf9brTe5RtCZNPjkKggd7bsDpBNcQfP6vTUtk=" className="d-block mx-auto" style={{width:"200px",}}/>
        <h3 className="text-center mb-3 fw-bold fs-2">OTP Verification</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
          <div className="mb-3">
                {/* <label htmlFor="email" className="form-label">
                  Email
                </label> */}
                <input
                  type="email"
                  className="form-control w-75 ms-5"
                  value={email}
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange
                  readOnly
                  required
                  style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc',}}

                />
              </div>
              <div className="mb-3">
                {/* <label htmlFor="email" className="form-label">
                  Email
                </label> */}
                <input
                  type="password"
                  className="form-control ms-5 w-75"
                  value={NewPass}
                  name="NewPass"
                  placeholder="Enter new Password"
                  onChange={(e) => setNewpass(e.target.value)}
                  required
                  style={{backgroundColor:"#f0f0f0",color:"#333",border: '1px solid #ccc',}}

                />
              </div>
          <OtpInput
              value={otp}
              name="otp"
              className=" w-25"
              onChange={handleChange}
              numInputs={6}
              separator={<span>-</span>} // Separator between input fields
              inputStyle={{
                width: "40px",
                height: "2.5rem",
                margin: "0.1rem",
                fontSize: "1.5rem",
                borderRadius: "5px",
                border: "2px solid #ced4da",
              }}
              containerStyle={{
                justifyContent: "center",color:"black",
              }}
            />
          </div>
        
          <button type="submit" className="btn btn-dark rounded-pill justify-content-center w-75 ms-5 ">
            Verify OTP
          </button>
        
        </form>
        <div className="text-center mt-3">
          {/* <p>
            Didn't receive the OTP?{" "}
            <button
              className="btn btn-link p-0"
              type="button"
              onClick={() => navigate("/forgot")}
            >
              Resend OTP
            </button>
          </p> */}
          {timeLeft >0 ? (
            <p >Resend OTP in : <span style={{color: timeLeft <= 100 ? "red" : "green", // Switch to red when 10 seconds or less
              fontSize: "1rem",
              fontWeight: "bold",}}>{formatTime(timeLeft)}</span></p>
          ):(
            // <p style={{color:"red"}}>OTP has expired !</p>
            <Link to="/forgot" style={{textDecoration:"none"}}>Resend OTP</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;