import jwt from "jsonwebtoken";
import { User } from "../models/User.js"
export const verifyToken= async(req,res,next)=>{
    const token=req.header("Auth");
    if(!token) return res.status(422).json({message:"Access Denied"});

    try{
        const verified=jwt.verify(token,"!@#$%^&*()");
        const id=verified.userId;
        console.log(id)
        let user = await User.findById(id);
        if(!user) return res.json({message:"User not exists"})
        req.user=user;
        next();
    } catch(error){
        res.status(400).json({message:"Invalid token"});
    }
}

export const isAdmin = (req,res,next)=>{
    console.log(req.user.role)
    if(req.user.role !== "Admin") return res.status(403).json({ message : "Not an Admin "});
    next();
}