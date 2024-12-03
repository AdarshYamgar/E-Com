import React, { useContext ,useState,useEffect} from "react";
import AppContext from "../context/AppContext";
import { Link,useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ReactLoading from "react-loading"

const UserProductList=()=>{
    const {products,filteredData,addToCart}=useContext(AppContext);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
      if(loading){
        document.title="Loading"
      }else{
        document.title="Product List"
      }

      const timer=setTimeout(()=>{
        setLoading(false);
        
      },3000)
      return () => clearTimeout(timer);
    },[loading])

   

    return(
      <div>
        {loading ? (
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f8f9fa",
          }}
        >
          {/* Loading spinner in the center */}
          <ReactLoading type="spin" color="#0d6efd" height={70} width={70}  />
          
          <span style={{ marginLeft: "10px", fontSize: "18px" }}>
          
          </span>
        </div>
        ):(


        
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
                        <div className="card-title">
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
          <button class="add-cart" onClick={()=>addToCart(product._id,product.title,product.discountPrice,1,product.imgSrc)}>Add to Cart</button>
        </div>
             </div>
             

         {/* )} */}
          </div>
        )}
        </div>
        <Footer/>
        </>
        )}
        </div>
    )
}
export default UserProductList;   