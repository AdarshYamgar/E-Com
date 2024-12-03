import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
const Cart=()=>{
    const {cart,decreaseQty,addToCart,removeFromCart,ClearCart}=useContext(AppContext)
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
    console.log("cartttt",cart)
    return(
        <div>
        {cart?.items?.length > 0 ? (
            <>
        <div>
            <div style={{display:"flex", marginLeft:"45%" , marginTop:"30px" }}>
        <ShoppingBagIcon style={{fontSize:"45px"}}/>
        <h1>Cart</h1>
        </div>
        <div className="my-5 text-center" style={{display:"flex", justifyContent:"space-around" , fontWeight:"bold"}}>
            <h2>Total Quantity :- {qty}</h2>
            <h2>Total Price :-{" ₹ "}{Math.ceil(price)}</h2>
        </div>
        {cart?.items?.map((product)=><div key={product._id} className="container bg-dark p-3 my-5 text-center">
             <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                <div className="cart_img">
                 <img src={`http://localhost:8080/uploads/${product?.imgSrc}`} style={{width:"150px",height:"150px",borderRadius:"10px"}}/>
                </div>
                <div className="cart_des">
                    <h2>{product.title}</h2>
                    <h3>{"₹ "}{Math.ceil(product.price)}</h3>
                    <h4>Qty :- {product.qty}</h4>
                </div>
                <div className="cart_action">
                    <button className="btn btn-light mx-3" style={{fontWeight:"bold"}} onClick={()=>decreaseQty(product.productId,1)}>-</button>
                    <button className="btn btn-light mx-3" style={{fontWeight:"bold"}} onClick={()=>addToCart(product.productId,product.title,product.price/product.qty,1,product.imgSrc)}>+</button>
                    <button className="btn btn-danger mx-3" style={{fontWeight:"bold"}} onClick={()=>removeFromCart(product.productId)}>
                    <span class="material-symbols-outlined">
delete
</span>
                    </button>

                </div>
             </div>
        </div>)}
        <div className="container text-center">
           <Link to="/address" className="btn btn-warning m-3">Checkout</Link>
           <button className="btn btn-danger m-3" onClick={()=>ClearCart(true)}>clear Cart</button>
        </div>
        </div>
    </>
        )
        :(
    <>
         <img src="https://i.pinimg.com/564x/02/9b/19/029b19ffd24ef2b2807cb459193bcbe1.jpg" alt=""  className="imgadjust"/>
        <h2 className="pt-2 text-center">No cart items added yet</h2>
        <p className="pt-1 text-center text-muted">Optionally add cart items to check rates that are affected by cart contents</p>
        <div className="container text-center">
        <Link to="/userproductlist"  type="button" class="btn btn-success m-2">Add Products</Link>
        </div>
        </>
        )}
           
        </div>
    )
}

export default Cart;