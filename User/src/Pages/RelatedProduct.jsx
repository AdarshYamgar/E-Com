import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";
const RelatedProduct=({category})=>{
    const {products,addToCart}=useContext(AppContext)
    const [relatedProduct,setRelatedProduct]=useState([])
    useEffect(()=>{
       setRelatedProduct(products.filter((data)=>data?.category?.toLowerCase()==category?.toLowerCase()))
    },[category,products])


    const scrollToTop=()=>{
      window.scrollTo({
          top:0,
          behavior:"instant",
      })
  }
   return(   
    <>                                 
     <div className="container text-center ">
         <h1 className="mt-5 fs-2 fw-bold">Related Products</h1>
         <div className="card-wrapper">
        {relatedProduct.map((product)=>
          <div className="card-container">
           {/* {products.map((product)=>  */}
             <div className="card vertical">
                  <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
                <img  
                      src={`http://localhost:8080/uploads/${product.imgSrc}`}
                      className="card-img-top1" alt="..." style={{width:"250px",height:"250px" , borderRadius:"10px",border:"2px solid black"}}
                      />
                      </Link>
                      <div className="card-info">
                        <div className="fs-4">
                            <h3>{product.title}</h3>
                            </div>
                            <div className="price">
                          <p className="disc-price">{"₹"}{product.discountPrice}</p>
                          <p className="actual-price">{product.price}</p>
                          <p className="price-percentage">{"( "}{product.discountPercentage}{"%"}{" OFF"}{" )"}</p>
                            </div>
                        </div>   
                        <div class="bottom-btn cart">
          <button class="add-cart" onClick={()=>addToCart(product._id,product.title,product.price,1,product.imgSrc)}>Add to Cart</button>
          {/* <button class="add-cart" onClick={scrollToTop}>Add to Cart</button> */}

        </div>
             </div>
             

         {/* )} */}
          </div>
        )}
        </div>
     </div>
    </>
   )
}
export default RelatedProduct;
