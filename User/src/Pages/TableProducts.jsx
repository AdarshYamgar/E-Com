import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
const TableProducts=({cart})=>{
  const {decreaseQty,addToCart,removeFromCart,ClearCart}=useContext(AppContext)
  const [qty,setQty]=useState(0);
  const [price,setPrice]=useState(0);
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
    return(
        <>
        <table className="table table-bordered border-dark">
  <thead>
    <tr style={{textAlign:"center"}}>
      <th scope="col">Product Img</th>
      <th scope="col">Title</th>
      <th scope="col">Price</th>
      <th scope="col">Qty</th>
      <th scope="col">Qty++</th>
      <th scope="col">Qty--</th>
      <th scope="col">remove</th>

    </tr>
  </thead>
  <tbody>
    {cart?.items?.map((product)=>
      <tr key={product._id} style={{textAlign:"center",cursor:"pointer"}}>
      <th scope="row">
        <img src={`http://localhost:8080/uploads/${product?.imgSrc}`} style={{width:"60px",height:"60px"}}/>
      </th>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.qty}</td>
      <td><span class="material-symbols-outlined" onClick={()=>addToCart(product.productId,product.title,product.price/product.qty,1,product.imgSrc)}>
add_circle
</span></td>
      <td><span class="material-symbols-outlined" onClick={()=>decreaseQty(product.productId,1)}>
do_not_disturb_on
</span></td>
      <td><span class="material-symbols-outlined" onClick={()=>removeFromCart(product.productId)}>
delete
</span></td>

    </tr>
    )}

<tr >
<th scope="row">
        
      </th>
      <td className="text-danger " style={{fontWeight:"bold",textAlign:"center"}}>Total</td>
      <td className="text-success" style={{fontWeight:"bold",textAlign:"center"}}>{Math.ceil(price)}</td>
      <td className="text-primary " style={{fontWeight:"bold",textAlign:"center"}}>{qty}</td>
      <td></td>
      <td></td>
      <td></td>

    </tr>
   
   
  </tbody>
</table>
        </>
    )
}
export default TableProducts;