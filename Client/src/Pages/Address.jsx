import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address=()=>{
   const [errors,setErrors]=useState({})
   const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
   const {shippingAddress,userAddress}=useContext(AppContext)
   const [FormData,setFormData]=useState({
      fullName:"",
      address:"",
      city:"",
      state:"",
      country:"",
      pincode:"",
      phoneNumber:""
   })
   const navigate=useNavigate();

   const validate=()=>{
      const errors={};
      const pin=/^\d{5,6}$/;
      const mob=/^\d{10}$/;

      if(!fullName){
         errors.fullName="Name is required";
      }
      if(!address){
         errors.Address="Address is required"
      }
      if(!city){
         errors.city="City is required"
      }
      if(!state){
         errors.state="State is required"
      }
      if(!country){
         errors.country="Country is required"
      }

      if(!pincode){
         errors.pincode="Pincode is required"
      }else if(!pin.test(pincode)){
         errors.pincode="Pincode must be a 5 or 6 digit number";
      }

      if(!address){
         errors.address="Address is required"
      }

      if(!phoneNumber){
         errors.phoneNumber="Phone number is required";
      }else if(isNaN(phoneNumber)){
         errors.phoneNumber="Phone number must be valid number"
      }
      else if(!mob.test(phoneNumber)){
         errors.phoneNumber="Phone number must be 10-digit number"
      }
      return errors;
   }
   
   const onChangeHandler=(e)=>{
      const{name,value}=e.target;
      setFormData({...FormData,[name]:value})

      // if(name === "country"){
      //    // const selectedCountry=countries.find(c=>c.name === value);
      //    setSelectedCountry(value)
      //    console.log(selectedCountry)
      //    setStates(selectedCountry ? selectedCountry.states:[]);
      //    setCities([]);
      //    setFormData({...FormData})
      // }
      // else if(name === "state"){
      //    const selectedState=states.find(s=>s.name === value);
      //    console.log(value)
      //    setCities(selectedState ? selectedState.cities : []);
      //    setFormData({...FormData})
      // }
   }

   const {fullName,address,city,state,country,pincode,phoneNumber}=FormData
   const submitHandler=async(e)=>{
      e.preventDefault();
      const validationErrors=validate();
      if(Object.keys(validationErrors).length>0){
           setErrors(validationErrors)
      }else{
         const result=await shippingAddress(fullName,address,city,state,country,pincode,phoneNumber)
         console.log(FormData)
         setFormData({
            fullName:"",
            address:"",
            city:"",
            state:"",
            country:"",
            pincode:"",
            phoneNumber:""
         })
         navigate("/checkout")
      }
      
   }
   return(
      <>
      <div className="container my-5 mb-3" style={{border:"2px solid black",borderRadius:"10px"}}>
         <h1 className="text-center">Shipping Address</h1>
         <div className="row">
             <div className="mb-3 my-3 col-md-4">
                <label className="form-label">Full Name{errors.fullName && <span style={{color:"red"}}>*</span>}</label>
                <input type="text" name="fullName" value={fullName} onChange={onChangeHandler} className="form-control bg-light text-dark"/>
                {errors.fullName && <p style={{color:"red"}}>{errors.fullName}</p>}
             </div>
              <div className="mb-3 my-3 col-md-4">
                 <label className="form-label">Country{errors.country && <span style={{color:"red"}}>*</span>}</label>
                 <input type="text" name="country" value={country} onChange={onChangeHandler} className="form-control bg-light text-dark"/>
                 {errors.country && <p style={{color:"red"}}>{errors.country}</p>}
             </div>
              <div className="mb-3 my-3 col-md-4">
                 <label className="form-label">State{errors.state && <span style={{color:"red"}}>*</span>}</label>
                 <input type="text" name="state" value={state} onChange={onChangeHandler} className="form-control bg-light text-dark"/>
                 {errors.state && <p style={{color:"red"}}>{errors.state}</p>}
             </div> 
         </div>
         <div className="row">
            <div className="mb-3 my-3 col-md-4">
               <label className="form-label">City{errors.city && <span style={{color:"red"}}>*</span>}</label>
               <input type="text" name="city" value={city} onChange={onChangeHandler} className="form-control bg-light text-dark"/>
               {errors.state && <p style={{color:"red"}}>{errors.city}</p>}
            </div>
            <div className="mb-3 my-3 col-md-4">
                <label className="form-label">Pincode{errors.pincode && <span style={{color:"red"}}>*</span>}</label>
                <input type="number" name="pincode" value={pincode} onChange={onChangeHandler} className="form-control bg-light text-dark"/>
                {errors.pincode && <p style={{color:"red"}}>{errors.pincode}</p>}
            </div>
            <div className="mb-3 my-3 col-md-4">
                 <label className="form-label">Phone number{errors.phoneNumber && <span style={{color:"red"}}>*</span>}</label>
                 <input type="number" name="phoneNumber" value={phoneNumber} onChange={onChangeHandler} className="form-control bg-light text-dark"/>
                 {errors.phoneNumber && <p style={{color:"red"}}>{errors.phoneNumber}</p>}
            </div>
         </div>
         <div className="row">
            <div className="mb-3 my-3">
              <label className="form-label">Address near by{errors.address && <span style={{color:"red"}}>*</span>}</label>
              <textarea type="text" name="address" value={address} onChange={onChangeHandler} className="form-control bg-light text-dark"/>
              {errors.address && <p style={{color:"red"}}>{errors.address}</p>}
            </div>
         </div>

     {/* try to creating dynamic dropdown list */}
         {/* <div className="row">
         <div className="mb-3 my-3 col-md-4">
                 <label className="form-label">Country{errors.country && <span style={{color:"red"}}>*</span>}</label>
                 <select name="country" value={country} onChange={onChangeHandler} required>
                 <option value="">Select Country</option>
                  {countryData.map(country=>(
                     <option key={country.id} value={country.name}>{country.name}</option>
                  ))}
                 </select>
                 {errors.country && <p style={{color:"red"}}>{errors.country}</p>}
             </div>
             <div className="mb-3 my-3 col-md-4">
             <label className="form-label">State{errors.country && <span style={{color:"red"}}>*</span>}</label>
             <select name="state" value={state} onChange={onChangeHandler} required>
             <option value="">Select Country</option>
                {stateData.map(state=>(
                  <option key={state.id} value={state.name}>{state.name}</option>
                ))}
             </select>

             </div>
         </div> */}
         <div className="d-grid col-6 mx-auto my-3">
           <button type="submit" onClick={submitHandler} className="btn btn-primary">Submit</button>
         </div>
         {/* {userAddress && (
            <div className="d-grid col-6 mx-auto my-3" onClick={()=>navigate("/checkout")}>
               <button className="btn btn-warning">Use Old Address</button>
            </div>

         )} */}
        
      </div>

      </>
   )
}
export default Address;