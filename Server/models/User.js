import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    lastName:{type:String,require:true},
    city:{type:String,require:true},
    state:{type:String,require:true},
    pincode:{type:String,require:true},
    address:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    role:{type:String,enum:["Admin","User"]},
    phoneNumber:{type:Number,require:true},
    dateOfBirth:{type:Date,require:true},
    otp:{type:String,require:false},
    otpExpiration:{type:Date,require:false},
    createdAt:{type:Date,default:Date.now},
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
  });


export const User= mongoose.model("User",userSchema);
export default User
// const User=mongoose.model("User",userSchema);
// export default User;