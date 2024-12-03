import mongoose from "mongoose";
const expenseSchema=new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    productName:{type:String,required:true},
    CurrentQty:{type:Number,required:true},
    quantitySold:{type:Number,required:true},
    saleAmount:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now}
})
export const Expense=mongoose.model("Expense",expenseSchema);