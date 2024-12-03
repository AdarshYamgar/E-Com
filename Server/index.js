import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import authRoutes from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import addressRouter from "./routes/addressRoutes.js"
import path from "path"
import paymentRoutes from "./routes/paymentRoutes.js"
import expenseRoutes from "./routes/expenseRoute.js"

const app=express();
app.use(cors({
    origin:true,
    method:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());
app.use("/uploads",express.static(path.join(path.resolve(),"uploads")))
app.use("/auth",authRoutes);
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)

app.use("/api/address",addressRouter)
app.use("/api/payment",paymentRoutes)
app.use("/api/expense",expenseRoutes)

const PORT=process.env.PORT || 8080
mongoose.connect("mongodb://localhost:27017",{
    dbName:"E-CommerceDB"
}).then(()=>console.log("MongoDB Connected Successfully ..."))


//demo


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})