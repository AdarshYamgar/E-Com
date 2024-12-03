import { Cart } from "../models/Cart.js";
import {Product} from "../models/Product.js"
import {Expense} from "../models/Expense.js"

export const addToCart=async(req,res)=>{
    const {productId,title,price,qty,imgSrc}=req.body

    const userId=req.user;
    console.log("i am cart controller",productId,title,price,qty,imgSrc)
    console.log(typeof(price))

    let cart=await Cart.findOne({userId});

    const product=await Product.findById(productId);
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    
    if(!cart){
        cart=new Cart({userId,items:[]})
    }
       const eexp=await Expense.findOne({productId:productId});
       

       
       const itemIndex=cart.items.findIndex(
        (item)=>item.productId.toString() === productId) 
        console.log("dffsf",itemIndex)
       
       if(itemIndex > -1){
        if(eexp){
            console.log("eexp is",eexp?.CurrentQty)
           }
         const dif=eexp?.CurrentQty-cart.items[itemIndex].qty;  
         if(dif>5){
          console.log("difference is",dif)
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price += price*qty
        console.log(cart.items[itemIndex].qty)
         }
         else if(!eexp && product.currentStock-cart.items[itemIndex].qty>5){
            cart.items[itemIndex].qty += qty;
            cart.items[itemIndex].price += price*qty
            console.log(cart.items[itemIndex].qty)
            console.log(product.currentStock-cart.items[itemIndex].qty)
         }
         else{
            console.log("insuffusient stock")
            return res.status(909).json({message:"insufficient stock"})
            
         }
       }else{
        if(eexp?.CurrentQty !== 5){
          cart.items.push({productId,title,price,qty,imgSrc});
        }else{
            console.log("insuffusient stock")
            return res.status(999).json({message:"insufficient stock 999"})
            
        }
       }
    await cart.save();
    res.json({message:"Item added to the Cart",cart})
}


export const userCart=async (req,res)=>{
     const userId=req.user;
    let cart=await Cart.findOne({userId});
    if(!cart) return res.json({message:"Cart not found"})
    
    res.json({message:"user cart",cart})
}


export const removeProductFromCart=async (req,res)=>{
    const productId=req.params.productId;
    const userId=req.user;
    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:"Cart not found"});
    cart.items=cart.items.filter((item)=>item.productId.toString() !== productId)
    await cart.save();
    res.json({message:"Product remove from cart",cart});
}

export const clearCart = async(req,res)=>{
    
    const userId=req.user;
    let cart = await Cart.findOne({userId});
    if(!cart){
       cart=new Cart({items:[]})
    }else{
       cart.items = [];
    }
    await cart.save();
    res.json({message:"Cart cleared",cart})
}


export const decreaseProductQtyCart=async(req,res)=>{
    const {productId,qty}=req.body
    console.log("cart controller",productId)

    const userId=req.user;

    let cart=await Cart.findOne({userId});
    console.log("user id ",userId)

    if(!cart){
        cart=new Cart({userId,items:[]})
    }
         
       const itemIndex=cart.items.findIndex(
        (item)=>item.productId.toString() === productId) 
        console.log("itemindex",itemIndex)
       
       if(itemIndex > -1){
        const item=cart.items[itemIndex]
        if(item.qty > qty){
           const pricePerUnit=item.price/item.qty
           item.qty -= qty
           item.price -= pricePerUnit*qty;
        }else{
            cart.items.splice(itemIndex,1)
        }


        
       }else{
          
          return res.json({message : "Invalid product Id"});
       }
    
    await cart.save();
    res.json({message:"Item qty decreased",cart})
}