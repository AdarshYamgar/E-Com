import mongoose from "mongoose";
const productSchema=new mongoose.Schema({
    title:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    discountPercentage:{type:Number,require:true},
    discountPrice:{type:Number,require:true},
    category:{type:String,require:true,enum:["Mobile","Laptop","Camera","Headphone"]},
    qty:{type:Number,require:true},
    currentStock:{type:Number,required:true},
    sold:{type:Number,default:0},
    imgSrc:{type:String,require:true},
    createdAt:{type:Date,default:Date.now},

});

productSchema.pre("save",function(next){
    console.log("inside discount price handler")
    if(this.discountPercentage>0){
        this.discountPrice=Math.ceil(Number(this.price-(this.price*(this.discountPercentage / 100))));
    }else{
        this.discountPrice=Math.ceil(this.price);
    }
    next();
})

productSchema.pre("findOneAndUpdate",function(next){
    console.log("inside update discount price")
    const update=this.getUpdate();
    if(update.price && update.discountPercentage >= 0 ){
        update.discountPrice =Math.ceil(update.price - (update.price * (update.discountPercentage / 100)));
    }
    next();
})

export const Product=mongoose.model("Products",productSchema)  