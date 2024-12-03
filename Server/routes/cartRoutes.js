import express from "express";
import { addToCart, clearCart, decreaseProductQtyCart, removeProductFromCart, userCart } from "../controllers/CartController.js";
import { verifyToken } from "../Middleware/auth.js";
const router=express.Router();

router.post("/add",verifyToken,addToCart);

router.get("/user",verifyToken,userCart);

router.delete("/remove/:productId",verifyToken,removeProductFromCart)

router.delete("/clear",verifyToken,clearCart);

router.post("/--qty",verifyToken,decreaseProductQtyCart)
export default router;