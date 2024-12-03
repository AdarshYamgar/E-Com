import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ImgSlider = () => {
    var settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        pauseOnHover:false,
        arrows:true,
        dots:true,
        autoplaySpeed: 2000,
        cssEase: "linear"
      };
  return(

   
    <>
    
   <div>
   <Slider {...settings}
      style={{margin:"3px"}}
      >
    <img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/a8275a3ce3f64bfd.jpeg?q=20' className='d-flex w-100'/>
    <img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/139e8c93a918366a.jpeg?q=20' className='d-flex w-100'/>
    <img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/dd484f1b19c67712.jpg?q=20' className='d-flex w-100'/>
     <img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/1316eb53d6f52c71.jpg?q=20' className='d-flex w-100'/>
     <img src='https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/0511ba08d5abe9aa.jpg?q=20' className='d-flex w-100'/>
     <img src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/69841ae2338de519.jpeg?q=20' className='d-flex w-100'/>
     <img src='https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/f7b74e32c435adb6.jpg?q=20' className='d-flex w-100'/>
   </Slider>
   </div>
   
    </>
  )
};

export default ImgSlider;