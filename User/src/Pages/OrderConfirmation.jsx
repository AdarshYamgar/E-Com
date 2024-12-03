import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";
import { useNavigate } from "react-router-dom";
const OrderConfirmation=()=>{
  const navigate=useNavigate();
    const {userOrder}=useContext(AppContext)
    const [latestOrder,setLatestOrder]=useState({})
    useEffect(()=>{
       if(userOrder){
        setLatestOrder(userOrder[0]);
       }
    },[userOrder])
    console.log("latestOrder",latestOrder);
    return(
        <>
        <div className="container my-5">
            <h1 className="text-center fs-1 fw-bolder">Your order has been confirm,</h1>
            <h3 className="text-center fs-3">It will delivered soon</h3>
        </div>
        <div className="container">
    

            <table className="table table-bordered border-dark">
  <thead>
    <tr>
      <th scope="col" style={{textAlign:"center",background:"#cc8b52", color:"white"}}>Order Items</th>
      
      <th scope="col" style={{textAlign:"center",background:"#cc8b52",color:"white"}}>OrderDetails & ShippingAddress</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td><ShowOrderProduct items={latestOrder?.orderItems}/></td>
    
      <td>
        <ul style={{fontWeight:"bold"}}>
            <li>OrderId:{"    "}{latestOrder?.orderId}</li>
            <li>PaymentId:{"    "}{latestOrder?.paymentId}</li>
            <li>Payment Status:{"    "}{latestOrder?.payStatus}</li>
          <li>Name:{"   "} {latestOrder?.userShipping?.fullName}</li>
          <li>Phone:{"   "} {latestOrder?.userShipping?.phoneNumber}</li>
          <li>Country:{"   "}{latestOrder?.userShipping?.country}</li>
          <li>State:{"    "}{latestOrder?.userShipping?.state}</li>
          <li>Pincode:{"    "}{latestOrder?.userShipping?.pincode}</li>
          <li>Near By:{ "    "}{latestOrder?.userShipping?.address}</li>
        </ul>
      </td>
    </tr>

  </tbody>
</table>
   
       
       
        
        </div>
        <div>

        </div>
        <div>
          <button onClick={()=>navigate("/")} className="Continuebtn">Continue Shopping ...</button>
        </div>
        </>
    )
}
export default OrderConfirmation;