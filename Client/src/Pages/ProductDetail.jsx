import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
const ProductDetail=()=>{
    const {addToCart}=useContext(AppContext)
    const {id}=useParams();
    const [prod,setProd]=useState()
    useEffect(()=>{
       const fetchProducts=async()=>{
        const api=await axios.get(`http://localhost:8080/api/product/${id}`,{
            headers:{
                "Content-Type":"Application/json"
            },
            withCredentials:true
        })
        console.log(api.data.products)
        setProd(api.data.products)
       };
       fetchProducts();
    },[id])
    return(
        <>
        {/* <h1>Product Details</h1> */}
        {console.log("Product Details id",id)}
        {console.log("Product data",prod)}
        <div className="container bg-dark text-center text-light my-5" style={{display:"flex",justifyContent:"space-around",alignContent:"center" , border:"1px solid black" , width:"50rem" ,height:"350px"}}>
            <div className="left">
                <img src={`http://localhost:8080/uploads/${prod?.imgSrc}`} alt="" style={{width:"300px",height:"300px", marginTop:"26px",borderRadius:"10px",border:"2px solid yellow" ,marginBottom:"50px" , marginLeft:"18px"}}/>
            </div>
            <div className="right" style={{marginTop:"30px"}}>
               <h1>{prod?.title}</h1>
               <p>{prod?.description}</p>
               <h1>{Math.ceil(prod?.discountPrice)} {" "}{"₹"}</h1>
               <div style={{marginTop:"20px"}}>
                        <button className="btn btn-warning" onClick={()=>addToCart(prod._id,prod.title,prod.price,1,prod.imgSrc)}>Add To Cart</button>
                    </div>
            </div>
         
    
        </div>
        <RelatedProduct category={prod?.category}/>
        </>
    )
}
export default ProductDetail;