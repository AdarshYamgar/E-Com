import { Product } from "../models/Product.js";
import { Expense } from "../models/Expense.js";
import multer from "multer";
import path from "path";
import fs from "fs"

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
export const upload=multer({storage:storage}).single("imgSrc");


export const addProduct=async(req,res)=>{
    try{
    const {title,description,price,discountPercentage,discountPrice,category,qty}=req.body;
    
    const newRecord=new Product({
        title,description,price,discountPercentage,discountPrice,category,qty,currentStock:qty,
        imgSrc:req.file.filename, 
    })
       await newRecord.save();
         console.log(newRecord)
        res.json({message:"Product added successfully",newRecord}) 
    }catch(error){
         console.log(error)
           res.json({message:error.message})
    } 
}


export const getProducts=async(req,res)=>{
    try{
    let products=await Product.find().sort({createdAt:-1})
    res.status(200).json(products);
    }catch(error){
          res.status(500).json({error:"Failed to fetch all products"})
    }
}


export const getProductsById=async(req,res)=>{
    const id=req.params.id;
    let products=await Product.findById(id)
    if(!products) return res.json({message:"Invalid Id"})
    res.json({message:"Specific products",products})    
}

export const updateProductsById=async(req,res)=>{
    const {id}=req.params;
    const {title,description,price,discountPercentage,discountPrice,category,qty}=req.body;
    try{
       const products=await Product.findByIdAndUpdate(id,{title,description,price,discountPercentage,discountPrice,category,qty,currentStock:qty},{new:true});
       if(!products) return res.json({message:"Invalid Id"})
        res.json(products)
        console.log(products)
        const exp=await Expense.findOne({productId:products._id});
        if(exp){
            console.log(exp)
            exp.CurrentQty=exp.CurrentQty+products.currentStock;
            const prod123=await Product.findByIdAndUpdate(id,{title,description,price,discountPercentage,discountPrice,category,qty,currentStock:exp.CurrentQty},{new:true})
        }
        await exp.save();
           
    }catch(error){
       res.status(400).send("Error updating employee");
    }
}

export const DeleteProductsById=async(req,res)=>{
    
    const {id} = req.params;
    try{
       let products=await Product.findById(id);
       if(!products) return res.json({message:"Invalid user id"})
        const imagePath=path.join("uploads",products.imgSrc);
         console.log(imagePath)
         if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath);
         }
         await Product.findByIdAndDelete(id);
        res.send("Product deleted successfully");
    }catch(error){
         res.status(500).send("Error deleting employee");
    }
}