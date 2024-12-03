import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import crypto from "crypto";
import nodemailer from "nodemailer";




export const register=async(req,res)=>{
    console.log("I am in register block")
    const {name,email,password,role}=req.body;
    console.log(req.body);
    try{
        const user1=await User.findOne({email});
        if(user1){
            return res.status(400).send("Email already exists");
        }
    
        const user=new User({name,email,password,role});
        await user.save();
        res.status(201).send("User registered successfully");
    } catch(error){
        res.status(400).send("Error registering user");
    }
};
  
export const profile=async(req,res)=>{
       const userId=req.user;
        
     try{
    let user=await User.findOne({_id:userId});
    if(!user) return res.json({message:"Cart not found"})
        
        res.json({message:"user cart",user})
}catch(error){
    res.status(400).send("Error registering user");
}

}

export const UpdateProfile=async(req,res)=>{
    const {id}=req.params;
    console.log("i am inside update profile ")
    
    const {name,email,phoneNumber,dateOfBirth,lastName,city,state,pincode,address}=req.body;
    try{
       
        const user=await User.findByIdAndUpdate(id,{name,email,phoneNumber,dateOfBirth,lastName,city,state,pincode,address});
        if(!user) return res.json({message:"Invalid Id"})
            res.status(201).send("Profile updated successfully successfully");



    }catch(error){
        res.status(400).send("Error updating employee",);

    }

}


export const login=async(req,res)=>{
    const {email,password}=req.body;
    console.log("Login credentials",req.body)
    console.log(typeof(password))
    try{
        const user=await User.findOne({email});
        console.log(user);
        
        console.log("Login password is ", await bcrypt.hash(password,10))
        console.log("Login for user compare",user.password)
        console.log((await bcrypt.compare(password,user.password)))
        if(!user || !(await bcrypt.compare(password,user.password))){

            return res.status(400).send("Invalid credentials");
        }
        const token=jwt.sign({userId:user._id},"!@#$%^&*()",{expiresIn:"7d"});
        res.json({token,user});
    }catch(error){
           res.status(500).send("Error logging in");
    }
}



  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const forgotPassword=async(req,res)=>{
     const {email}=req.body;
     try{
      const user=await User.findOne({email});
      if(!user){
        return res.status(432).json({message:"User not found"});
      }
      const otp=generateOtp();
      const otpToken = jwt.sign({ otp, email }, "!@#$%^&*()", { expiresIn: '10m' });
       const expirationTime = Date.now() + 10 * 60 * 1000; 
      const resetLink = `https://your-app.com/reset-password?token=${otpToken}&expires=${expirationTime}&otp=${otp}`;
      console.log(resetLink)
      user.otp=otp;
      user.otpExpiration=expirationTime;
      await user.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
          user: "adarshyamgar6050@gmail.com",
          pass: "qdxo tvbl eoul pbfg",
        },

      });

      const mailOptions = {
        from: 'adarshyamgar6050@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
      };
      console.log(mailOptions)
  
      await transporter.sendMail(mailOptions);
      console.log(transporter)
      
      res.status(200).json({ message: 'OTP sent to email', token: otpToken });

     

     }catch(error){
         res.status(500).json({message:"Error sending otp",error})
     }
}


export const ResetPassword=async(req,res)=>{
    const {otp,email,newPassword}=req.body;
    console.log("I am in reset password email ",email)
    console.log("I am in reset password newPass",newPassword)
    console.log("I am in reset password otp",otp)
    console.log("Type if otp is",typeof(otp))
    const otp1= await Number(otp)

    try{
        const user=await User.findOne({email})
        if(!user){
        res.status(200).json({message:" sending otp"})
        }
        const abc=Date.now()-user.otpExpiration
        console.log(Date.now(),user.otpExpiration)
         console.log("Expiration timing is :", abc)
        if(user.otp !== otp){
            return res.status(500).json({ message: 'Invalid OTP' });
        }
         
        if (Date.now() > user.otpExpiration) {
            return res.status(400).json({ message: 'OTP has expired' });
          }

          const hashedPassword = await bcrypt.hash(newPassword, 10);

          user.password = newPassword;
          user.otp = null;
          user.otpExpiration = null;
          await user.save();
      
          return res.status(200).json({ message: 'Password successfully updated' });


    }catch(error){
        res.status(400).json({message:"Error sending otp",error})

    }
}