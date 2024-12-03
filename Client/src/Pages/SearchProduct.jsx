import React, { useContext, useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
const SearchProduct=()=>{
    const {products,setCurrentProduct}=useContext(AppContext)
    const [searchProduct,setSearchProduct]=useState([])
    const {term}=useParams();
    useEffect(()=>{
        setSearchProduct(products.filter((data)=>data?.title?.toLowerCase().includes(term.toLowerCase())))
    },[term,products])

    const userRole=JSON.parse(localStorage.getItem("user_Login"));
    console.log(userRole)
   return(
    <div>
    
    {userRole === "User" && (
     <div className="container text-center">
         <div className="card-wrapper">
        {searchProduct.map((product)=>
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
                        <div className="card-title">
                            <h3>{product.title}</h3>
                            </div>
                            <div className="price">
                          <p className="disc-price">{product.price}</p>
                            </div>
                        </div>
                        <div class="bottom-btn cart">
          <button class="add-cart">Add to Cart</button>
        </div>
             </div>
             

         {/* )} */}
          </div>
        )}
        </div>
     </div>
    )}

    {userRole === "Admin" && (
      <div className="row container d-flex justify-content-center align-items-center">
      {searchProduct.map((product)=><div key={product._id} className="my-3 col-md-4 d-flex justify-content-center align-items-center">
         <div className="card bg-dark text-light text-center" style={{width:"18rem"}}>
          <div className="d-flex justify-content-center align-items-center p-3">
          <img  
                src={`http://localhost:8080/uploads/${product.imgSrc}`}
                className="card-img-top" alt="..." style={{width:"250px",height:"250px" , borderRadius:"10px",border:"2px solid black"}}
                />
                </div>
               <div className="card-body">
                   <h5 className="card-title">{product.title}</h5>
                   <div className="my-3">
                   <button class="btn btn-danger" onClick={()=>deleteProduct(product._id)}>Delete</button>
                   <Link to="/addproduct"><button className="btn btn-warning" onClick={()=>setCurrentProduct(product)} style={{width:"90px", marginLeft:"20px"}}>Update</button></Link>
                   
                   </div>
               </div>

         </div>
          </div>
      )}
  </div>
      
    )}
  
    </div>
   )
}
export default SearchProduct;
