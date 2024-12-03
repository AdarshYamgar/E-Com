import { Payment } from "../models/Payment.js";
import Razorpay from "razorpay"
import { Product } from "../models/Product.js";
import { Expense } from "../models/Expense.js";

const razorpay=new Razorpay({
     key_id:"rzp_test_pwhBArZBqTJchc",
     key_secret:"gIMe3IkTzzKssKGJAqQPKQzF",
});

export const checkout=async(req,res)=>{
    try{
    const {amount,cartItems,userShipping,userId}=req.body
    console.log("User id checking in checkout block",userId)
      console.log("i am in razorpay controller")
    var options={
        amount:amount*100,  
        currency:"INR",
        receipt:`receipt_${Date.now()}`,

    };
    console.log("option is ",options)

    const order=await razorpay.orders.create(options);
    console.log("order is ",order)
    res.json({
        orderId:order.id,
        amount:amount,
        cartItems,
        userShipping,
        userId,
        payStatus:"created"
    });
}catch(error){
    res.status(400).send("something went wrong sdgfddgf");

}
}

export const verify=async(req,res)=>{
 const {orderId,paymentId,signature,amount,orderItems,userName,userId,userShipping}=req.body;
 console.log("my order items is ",orderItems)
 console.log("my user id is in payment verify block ",userId)

 for(let item of orderItems){
    const prod=await Product.findById(item.productId);
    console.log("The prod id is",prod)
    console.log(item.qty)
    if(!prod || prod.currentStock < item.qty){
        return res.status(400).json({message:"Insufficient stock for one or more products"})
    }
   
    const exp=await Expense.findOne({productId:prod._id})
    if(exp){
        exp.quantitySold = exp.quantitySold+item.qty,
        exp.saleAmount += prod.discountPrice * item.qty,
        exp.CurrentQty = exp.CurrentQty - item.qty;
        console.log(exp.quantitySold,item.qty)
        await exp.save();

    }else{
    const expense=new Expense({
       productId:prod._id,
       productName:prod.title,
       CurrentQty:prod.currentStock-item.qty,
       quantitySold:item.qty,
       saleAmount:prod.discountPrice * item.qty,
    });
    await expense.save();
}
prod.currentStock -= item.qty;
    prod.sold += item.qty;
    await prod.save();

 }
 let orderConfirm=await Payment.create({
    orderId,paymentId,signature,amount,orderItems,userName,userShipping,uid:userId,payStatus:"Paid"
})
res.json({message:"Payment Successfully",success:true,orderConfirm}) 

}

export const userOrder=async(req,res)=>{
    let userId=req.user._id.toString();

    console.log("my user id in my order is ",userId)


    let orders=await Payment.find({uid:userId}).sort({orderDate:-1});
    console.log(orders)
    res.json(orders)
}

export const allOrders=async(req,res)=>{
    
    
    let orders=await Payment.find().sort({orderDate:-1});
    res.json(orders)
}

export const confirmPayment=async(req,res)=>{
     const {orderId,paymentId}=req.body;
     console.log("order id is",orderId);
     console.log("payment id is ",paymentId)
}