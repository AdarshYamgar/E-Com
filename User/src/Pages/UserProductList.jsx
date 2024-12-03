import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import Footer from "./Footer";
import ImgSlider from "./ImgSlider";

const UserProductList=()=>{
  const navigate=useNavigate();
    const {products,filteredData,addToCart}=useContext(AppContext);
    const HandleaddToCart=async(product)=>{
        console.log("qqqqqqqqqq",product?.title)
        if(await addToCart(product._id,product.title,product.discountPrice,1,product.imgSrc)){
            console.log("inside addto cart handler",product.title,product.discountPrice)
        }else{
          navigate("/login")

        }
        
    }
    
    return(
        <>
        {/* <div className="row container d-flex justify-content-center align-items-center">
            {products.map((product)=><div key={product._id} className="my-3 col-md-4 d-flex justify-content-center align-items-center">
               <div className="card bg-dark text-light text-center" style={{width:"18rem"}}>
                <Link to={`/product/${product._id}`} className="d-flex justify-content-center align-items-center p-3">
                <img  
                      src={`http://localhost:8080/uploads/${product.imgSrc}`}
                      className="card-img-top" alt="..." style={{width:"250px",height:"250px" , borderRadius:"10px",border:"2px solid yellow"}}
                      />
                      </Link>
                     <div className="card-body">
                         <h5 className="card-title">{product.title}</h5>
                         <div className="my-3">
                         <button class="btn btn-primary mx-3">{product?.price} {" "}{"₹"}</button>
                         <Link to="/addproduct"><button className="btn btn-warning" >Add to Cart</button></Link>
                         
                         </div>
                     </div>

               </div>
                </div>
            )}
        </div> */}
        <ImgSlider/>
        
       
        <div className="card-wrapper">
        {filteredData.map((product)=>
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
                          <p className="disc-price">{"₹"}{Math.ceil(product.discountPrice)}</p>
                          {product.discountPercentage>0 &&(
                            <>
                          <p className="actual-price">{product.price}</p>
                          <p className="price-percentage">{"( "}{product.discountPercentage}{"%"}{" OFF"}{" )"}</p>
                          </>
                          )}
                            </div>
                        </div>
                        <div class="bottom-btn cart">
          {/* <button class="add-cart" onClick={()=> addToCart(product._id,product.title,product.discountPrice,1,product.imgSrc)}>Add to Cart</button> */}
          <button class="add-cart" onClick={()=>HandleaddToCart(product)}>Add to Cart</button>

        </div>
             </div>
             

         {/* )} */}
          </div>
        )}
        </div>
        <Footer/>
        </>
    )
}
export default UserProductList;   