import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import TableProducts from "./TableProducts";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Checkout=()=>{
  const navigate=useNavigate();
    const {cart,userAddress,user,ClearCart}=useContext(AppContext)
    const [qty,setQty]=useState(0);
    const [price,setPrice]=useState(0);
   // console.log("cartttt",cart)
   console.log(userAddress)
   useEffect(()=>{
    let qty=0;
    let price=0;
    if(cart?.items){
        for(let i=0;i<cart.items?.length;i++){
            qty += cart.items[i].qty
            price += cart.items[i].price
        }
    }
    setPrice(price)
    setQty(qty)

},[cart])
console.log("checkout user",user)

const handlePayment=async()=>{
  try {
    const prof=JSON.parse(localStorage.getItem("profile"))
    console.log("prof is",prof)

      const orderResponse=await axios.post("http://localhost:8080/api/payment/checkout",{
        amount:price,
        cartItems:cart?.items,
        userShipping:userAddress,
        userId:prof?._id
      })
      console.log("order response",orderResponse)
      const {orderId,amount:orderAmount}=orderResponse.data
      var options = {
        "key": "rzp_test_pwhBArZBqTJchc", // Enter the Key ID generated from the Dashboard
        "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "GadgetPulse",
        "description": "Test Transaction",
        "image": "https://cdn.iconscout.com/icon/free/png-256/free-ecommerce-icon-download-in-svg-png-gif-file-formats--services-solution-cart-online-web-seo-development-vol-1-pack-design-icons-8830.png",
        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": async function (response){
          const paymentData={
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            signature:response.razorpay_signature,
            amount:orderAmount,
            qty:qty,
            orderItems:cart?.items,
            userName:prof?.name,
            userShipping:userAddress
          }
        const api=await axios.post("http://localhost:8080/api/payment/verify-payment",paymentData)  ;
        console.log("order response",api.data)
        if(api.data.success){
          navigate("/confetti")
          ClearCart(false);
        }

        const api2=await axios.get("http://localhost:8080/api/payment//confirm-Payment")
        
       
      // alert("Payment_id"+response.razorpay_payment_id);
      // alert("Order_id"+response.razorpay_order_id);
      // console.log(response.razorpay_order_id)
      // alert("Payment_sig"+response.razorpay_signature)
  },
        "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
        "prefill": {
            "name": "Adarsh Yamgar",
            "email": "adarshyamgar6050@gmail.com",
            "contact": "8329773012"
        },
        "notes": {
            "address": "Patrakar nagar Sangli"
        },
        "theme": {
            "color": "#3399cc"
        }
       

    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    
  } catch (error) {
    console.log(error)
  }
}
    return(
        <>
    
            
        <div className="container my-3">
            <h1 className="text-center m-4">Order Summery</h1>

            <table className="table table-bordered border-dark">
  <thead>
    <tr>
      <th scope="col" style={{textAlign:"center",background:"#1bb59b", color:"white"}}>Product Details</th>
      
      <th scope="col" style={{textAlign:"center",background:"#1bb59b",color:"white"}}>Shipping Address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><TableProducts cart={cart}/></td>
      <td>
        <ul style={{fontWeight:"bold"}}>
          <li>Name:{" "} {userAddress?.fullName}</li>
          <li>Phone:{" "} {userAddress?.phoneNumber}</li>
          <li>Country:{" "}{userAddress?.country}</li>
          <li>State:{" "}{userAddress?.state}</li>
          <li>Pincode:{" "}{ userAddress?.pincode}</li>
          <li>Near By:{ " "}{userAddress?.address}</li>
        </ul>
      </td>
    </tr>

  </tbody>
</table>
   
       
       
        
        </div>
        {cart?.items?.length >0 && (
        <div>
          <button onClick={handlePayment} className="btnEffect">Proceed To Pay</button>
        </div>
        )}
        
           
        </>
    )
}

export default Checkout;