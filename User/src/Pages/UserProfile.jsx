import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import LoginDemo from "../Auth/LoginDemo";
const UserProfile=()=>{
    const navigate=useNavigate();
    const [errors,setErrors]=useState({})
    const {profile,updateProfileById,getProfileDetails}=useContext(AppContext);
     const [formData,setFormData]=useState({
        email: '',
    password: '',
    name: '',
    phoneNumber: '',
    dateOfBirth: '',
    lastName:"",
    city:"",
    state:"",
    pincode:"",
    address:""
     })
    const [initialData,setInitialData]=useState(null);
    const [logg,setLogg]=useState(false)

    useEffect(() => {
      const storedUser1=localStorage.getItem("loggedIn");
      if(storedUser1){
        setLogg(JSON.parse(storedUser1))
    }
        if (profile) {
          setFormData({
            email: profile.email,
            password: profile.password,
            name: profile.name,
            phoneNumber: profile.phoneNumber || '',
            dateOfBirth: profile.dateOfBirth || '',
            lastName:profile.lastName || "",
            city:profile.city || "",
            state:profile.state || "",
            pincode:profile.pincode || "",
            address:profile.address || ""
          });
          setInitialData({
            email: profile.email,
            password: profile.password,
            name: profile.name,
          });
        }
      }, [profile]);   

      const validate=()=>{
        const errors={};
      const pin=/^\d{5,6}$/;
      const mob=/^\d{10}$/;
      if(!formData.name){
        errors.name="Name is required";
      }
      if(!formData.lastName){
        errors.lastName="Last name is required";
      }
      if(!formData.city){
        errors.city="City is required"
      }
      if(!formData.state){
        errors.state="State is required"
      }
      if(!formData.pincode){
        errors.pincode="Pincode is required"
     }else if(!pin.test(formData.pincode)){
        errors.pincode="Pincode must be a 5 or 6 digit number";
     }
     if(!formData.address){
      errors.address="Address is required"
   }
   if(!formData.phoneNumber){
    errors.phoneNumber="Phone number is required";
 }else if(isNaN(formData.phoneNumber)){
    errors.phoneNumber="Phone number must be valid number"
 }
 else if(!mob.test(formData.phoneNumber)){
    errors.phoneNumber="Phone number must be 10-digit number"
 }
 if(!formData.dateOfBirth){
  errors.dateOfBirth="Date is required"
 }
 return errors;

      }

      const handleChange=(e)=> setFormData({ ...formData,[e.target.name]:e.target.value })

      const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp); // Create Date object from timestamp
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-based
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const handleSubmit=(e)=>{
        e.preventDefault();
        const validationErrors=validate();
        if(Object.keys(validationErrors).length>0){
          setErrors(validationErrors)
     }else{
      Swal.fire({
        title:"Do you want to save the changes?",
        showDenyButton:true,
        showCancelButton:false,
        confirmButtonText:"Save",
        denyButtonText:`Don't save`

    }).then(async(result)=>{
        if (result.isConfirmed){
           await updateProfileById(profile?._id,formData)
             //Swal.fire("Saved!","","success");
            //  setProductData({title:"",description:"",price:"",category:"",qty:"",image:""});
            //  setCurrentProduct(null)
             console.log(formData)
             setTimeout(()=>{
              navigate("/")

             },2400)

        }else if(result.isDenied){
          setFormData({
            email: profile.email,
            password: profile.password,
            name: profile.name,
            phoneNumber: profile.phoneNumber || '',
            dateOfBirth: profile.dateOfBirth || '',
          });
            // Swal.fire("Changes are not saved","","info");
        }
        localStorage.setItem("profile",JSON.stringify(formData))

        getProfileDetails()
       

    })

     }
        // updateProfileById(profile._id,formData)
      //   Swal.fire({
      //     title:"Do you want to save the changes?",
      //     showDenyButton:true,
      //     showCancelButton:false,
      //     confirmButtonText:"Save",
      //     denyButtonText:`Don't save`

      // }).then(async(result)=>{
      //     if (result.isConfirmed){
      //        await updateProfileById(profile?._id,formData)
      //          //Swal.fire("Saved!","","success");
      //         //  setProductData({title:"",description:"",price:"",category:"",qty:"",image:""});
      //         //  setCurrentProduct(null)
      //          console.log(formData)
      //          navigate("/")

      //     }else if(result.isDenied){
      //       setFormData({
      //         email: profile.email,
      //         password: profile.password,
      //         name: profile.name,
      //         phoneNumber: profile.phoneNumber || '',
      //         dateOfBirth: profile.dateOfBirth || '',
      //       });
      //         // Swal.fire("Changes are not saved","","info");
      //     }
      //     localStorage.setItem("profile",JSON.stringify(formData))

      //     getProfileDetails()
         

      // })
      }


   
    return(
        
        // <>
        // {console.log(profile?._id)}
        // {console.log(formData.dateOfBirth)}
        // <h1 className="pt-3 text-center">Add Product</h1>
        // <div className="form-containerabc">
        // <form className="register-formabc"  onSubmit={handleSubmit}>
        //     <div className="mb-3">
        //     <label className="form-label">Email </label>
        //     <input type="email"
        //         className="form-control"
        //         name="email"
        //         value={formData.email}
        //         readOnly
            
        //     />
        //     </div>
            
        //     <div className="mb-3">
        //     <label className="form-label">Password</label>
        //     <input type="password"
        //         name="password"
        //         value={formData.password}
            
        //         className="form-control"
        //     />
        //     </div> 
        //     <div className="mb-3">
        //     <label className="form-label">Name</label>
        //     <input type="text"
        //         name="name"
        //         value={formData.name}
        //         onChange={handleChange}
            
        //         className="form-control"
        //     />
        //     </div>
        //     <div className="mb-3">
        //     <label className="form-label">Phone Number</label>
        //     <input type="number"
        //         name="phoneNumber"
        //         value={formData.phoneNumber}
        //         onChange={handleChange}
        //         className="form-control"
        //     />
        //     </div>
        //     <div className="mb-3">
        //     <label className="form-label">Date of Birth</label>
        //     <input type="date"
        //         name="dateOfBirth"
        //         value={convertTimestampToDate(formData.dateOfBirth)}
        //         onChange={handleChange}
        //         className="form-control"
        //     />
        //     </div>
            
            
        //     <button type="submit" className="m-5 btn btn-dark custom-hover">Save</button>
            
            
        // </form>
        // </div>
        // </>
        <>
        {logg ? (
        <div className="container d-flex justify-content-center align-items-center my-5 mb-3 ps-5 pe-5  " >
          <div className="card p-4 shadow" style={{width:"55%"}}>
         <h1 className="text-center pt-1 fs-1 fw-bold ">Profile</h1>
         <div className="row">
             <div className="mb-3  my-3 col-md-4">
                <label className="form-label">First Name{errors.name && <span className="text-danger">*</span>}</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="form-control bg-light text-dark"/>
                {errors.name && <p className="text-danger">{errors.name}</p>}
                
             </div>
              <div className="mb-3  my-3 col-md-4">
              <label className="form-label">Last Name {errors.lastName && <span className="text-danger">*</span>}</label>
                 <input type="text" name="lastName" value={formData.lastName} placeholder="Last Name"  onChange={handleChange} className="form-control bg-light text-dark"/>
                 {errors.lastName && <p className="text-danger">{errors.lastName}</p>}

             </div>
              <div className="mb-3  my-3 col-md-4">
              <label className="form-label">Email Address </label>

                 <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} className="form-control bg-light text-dark" readOnly/>
             </div> 
         </div>
         <div className="row">
            <div className="mb-3 my-3 pt-1 col-md-4">
            <label className="form-label">City {errors.city && <span className="text-danger">*</span>}</label>

               <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="form-control bg-light text-dark"/>
               {errors.city && <p className="text-danger">{errors.city}</p>}

            </div>
            <div className="mb-3 my-3 pt-1 col-md-4">
            <label className="form-label">State {errors.state && <span className="text-danger">*</span>}</label>
                <input type="text" name="state" placeholder="State" value={formData.state}  onChange={handleChange} className="form-control bg-light text-dark"/>
                {errors.state && <p className="text-danger">{errors.state}</p>}
            </div>

            <div className="mb-3 my-3 pt-1 col-md-4">
            <label className="form-label">Pincode{errors.pincode && <span className="text-danger">*</span>}</label>
                <input type="number" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="form-control bg-light text-dark"/>
                {errors.pincode && <p className="text-danger">{errors.pincode}</p>}
            </div>
            
         </div>
         <div className="row d-flex d-flex justify-content-center">
         <div className="mb-3 my-3 pt-2 col-md-4">
         <label className="form-label">Phone Number{errors.phoneNumber && <span className="text-danger">*</span>}</label>
                <input type="number" name="phoneNumber" value={formData.phoneNumber} placeholder="Phone Number"  onChange={handleChange} className="form-control bg-light text-dark"/>
                {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}

            </div>

            <div className="mb-3 my-3  pt-2 col-md-4">
            <label className="form-label">Birth Date {errors.phoneNumber && <span className="text-danger">*</span>}</label>
                <input type="date" name="dateOfBirth" value={convertTimestampToDate(formData.dateOfBirth)} placeholder="Date Of Birth" onChange={handleChange} className="form-control bg-light text-dark"/>
                {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth}</p>}

            </div>

         </div>
         <div className="row">
            <div className="mb-3 pt-2 my-3">
            <label className="form-label">Address{errors.address && <span className="text-danger">*</span>}</label>
              <textarea type="text" name="address" placeholder="Address" value={formData.address}  onChange={handleChange} className="form-control bg-light text-dark"/>
              {errors.address && <p className="text-danger">{errors.address}</p>}

            </div>
         </div>

    
         <div className="d-grid col-6 mx-auto my-3">
           <button type="submit" onClick={handleSubmit} className="btn btn-dark">Submit</button>
         </div>
         
        </div>
      </div>
        ):(
          <LoginDemo/>
        )}
        </>
    )
}
export default UserProfile;