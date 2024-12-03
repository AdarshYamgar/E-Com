import React, { useContext, useEffect,useState } from "react";
import AppContext from "../context/AppContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "../Auth/Login.jsx";
import LoginDemo from "../Auth/LoginDemo.jsx";
const Profile=()=>{
    const {products}=useContext(AppContext);
    const [profile,setProfile]=useState(null)
    const [logg,setLogg]=useState(false)
    useEffect(()=>{
        const storedUser=localStorage.getItem("profile");
        const storedUser1=localStorage.getItem("loggedIn");

        if(storedUser){
            setProfile(JSON.parse(storedUser))
        }
        if(storedUser1){
            setLogg(JSON.parse(storedUser1))
        }
    },[]);

    var settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        cssEase: "linear"
      };

    
    return(
        <div>
            {logg ? (
                <div>
        <>
        <div>
         <div className="profile">
            <h1>Welcome, {profile?.name}</h1>
            <h2>{profile?.email}</h2>
         </div>
         <div className="img-slider" style={{height:"20px",width:"90%", margin:"auto" }}>
         <Slider {...settings}
      style={{margin:"2rem"}}
      >
              {products.map((prod)=>
              <div key={prod._id}>
 <img  
 src={`http://localhost:8080/uploads/${prod.imgSrc}`}
  alt="..." style={{width:"100%",height:"250px" , borderRadius:"10px",border:"2px solid "}}
 />
 </div>
              )}
              </Slider>
         </div>
         </div>
        </>
        </div>
            ):(
                <LoginDemo/>
            )}
        </div>
    )
}
export default Profile;