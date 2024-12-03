import express from "express";
import {addProduct,DeleteProductsById,getProducts,getProductsById,updateProductsById,upload} from "../controllers/productController.js";
import { verifyToken,isAdmin } from "../Middleware/auth.js";
const router=express.Router();

router.post("/add",verifyToken,isAdmin,upload,addProduct);

router.get("/all",getProducts)

router.get("/:id",getProductsById)

router.put("/:id",verifyToken,isAdmin,updateProductsById)

router.delete("/:id",verifyToken,isAdmin,DeleteProductsById)

export default router