import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
const ShowOrderProduct=({items})=>{
  const {decreaseQty,addToCart,removeFromCart,ClearCart}=useContext(AppContext)
  const [qty,setQty]=useState(0);
  const [price,setPrice]=useState(0);
  useEffect(()=>{
    let qty=0;
    let price=0;
    if(items){
        for(let i=0;i<items?.length;i++){
            qty += items[i].qty
            price += items[i].price
        }
    }
    setPrice(price)
    setQty(qty)

},[items])
    return(
        <>
        <table className="table table-bordered border-dark">
  <thead>
    <tr style={{textAlign:"center"}}>
      <th scope="col">Product Img</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Qty</th>
      

    </tr>
  </thead>
  <tbody>
    {items?.map((product)=>
      <tr key={product._id} style={{textAlign:"center",cursor:"pointer"}}>
      <th scope="row">
        <img src={`http://localhost:8080/uploads/${product?.imgSrc}`} style={{width:"60px",height:"60px"}}/>
      </th>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.qty}</td>
      
    </tr>
    )}

<tr >
<th scope="row">
        
      </th>
      <td className="text-danger " style={{fontWeight:"bold",textAlign:"center"}}>Total</td>
      <td className="text-success" style={{fontWeight:"bold",textAlign:"center"}}>{Math.ceil(price)}</td>
      <td className="text-primary " style={{fontWeight:"bold",textAlign:"center"}}>{qty}</td>
      

    </tr>
   
   
  </tbody>
</table>
        </>
    )
}
export default ShowOrderProduct;