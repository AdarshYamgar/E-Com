import mongoose from "mongoose";
const otpSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    otp:{type:String},
    otpExpiry: { type: Date }
})
export const Otp=mongoose.model("Otp",otpSchema);