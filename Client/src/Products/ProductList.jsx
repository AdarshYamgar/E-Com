import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
const ProductList=()=>{
    const {getProducts,products,deleteProduct,setCurrentProduct}=useContext(AppContext);
    return(
        <>
        
        {/* <div className="container">
            <div className="row">
               {products.map((product)=>(
                <Card key={product._id} style={{width:"18rem"}}> 
                   <Card.Img variant="top" src={`http://localhost:8080/uploads/${product.imgSrc}`} style={{ objectFit:"cover"}}/>
                   <Card.Body>
                    <Card.Title style={{fontWeight:"bold",fontSize:"1.5rem"}}>{product.title}</Card.Title>
                    <Card.Text>
                         <p>{product.price}{"rupees"}</p>
                         <p>{product.category}</p>
                    </Card.Text>
                    <div className="d-flex">
                   <button class="btn btn-danger" onClick={()=>deleteProduct(product._id)}>Delete</button>
                    <Link to="/addproduct"><button className="btn btn-warning" onClick={()=>setCurrentProduct(product)}></button></Link>
                    </div>
                   </Card.Body>
                </Card>
               ))}

            </div>
        </div> */}
        <div className="row container d-flex justify-content-center align-items-center">
            {products.map((product)=><div key={product._id} className="my-3 col-md-4 d-flex justify-content-center align-items-center">
               <div className="card bg-dark text-light text-center w-75"  >
                <div className="d-flex justify-content-center align-items-center p-3">
                <img  
                      src={`http://localhost:8080/uploads/${product.imgSrc}`}
                      className="img-fluid "  alt="..." style={{width:"250px",height:"250px" , borderRadius:"10px",border:"2px solid black",}}
                      />
                      </div>
                     <div className="card-body">
                         <h5 className="">{product.title}</h5>
                         <div className=" container mt-4 ">
                            <div className="d-flex justify-content-center align-items-center">
                         <button class="btn btn-danger " onClick={()=>deleteProduct(product._id)}>Delete</button>
                         <Link to="/addproduct"><button className="btn btn-warning ms-3" onClick={()=>setCurrentProduct(product)} >Update</button></Link>
                           </div>                         
                         </div>
                     </div>

               </div>
                </div>
            )}
        </div>
        </>
    )
}
export default ProductList; 