import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";
import {useNavigate} from "react-router-dom"

import RelatedProduct from "./RelatedProduct";
const ProductCard = () => {
    const {addToCart}=useContext(AppContext)
    const navigate=useNavigate();
    const HandleaddToCart=async(product)=>{
        console.log("qqqqqqqqqq",product?.title)
        if(await addToCart(product._id,product.title,product.discountPrice,1,product.imgSrc)){
            console.log("inside addto cart handler",product.title,product.discountPrice)
        }else{
          navigate("/login")

        }
        
    }
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

    return (
        <>
      <div className="container  d-flex justify-content-center align-items-center mt-4 " >
        <div className="row min-vh-25 bg-dark text-light  border rounded  border-dark shadow mx-auto" style={{ width: "100%", maxWidth: "800px",maxHeight:"800px" }}>
          <div className="col-md-4 text-center">
            <img
              src={`http://localhost:8080/uploads/${prod?.imgSrc}`}
              alt={prod?.title}
              className="img-fluid rounded mt-4 mb-4 ms-4 border-warning border-3"
            />
          </div>
          <div className="col-md-8 ">
            <h3 className="mb-2 mt-3 ps-5 fw-bold fs-1">{prod?.title}</h3>
            <p className=" ps-5 fs-5 text-light" >{prod?.description}</p>
            <h4 className="text-warning ps-5 mt-2 fw-bold fs-5">{Math.ceil(prod?.discountPrice)} {" "}{"₹"}</h4>
            <button className="btn btn-primary mt-3 ms-5 mb-4 d-block " onClick={()=>HandleaddToCart(prod)}>Add to Cart</button>
          </div>
        </div>
      </div>
              <RelatedProduct category={prod?.category}/>
              </>

    );
  };
  
  export default ProductCard;