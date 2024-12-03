import express from "express"
import {checkout,userOrder,verify,allOrders,confirmPayment} from "../controllers/PaymentController.js"
import {verifyToken} from "../Middleware/auth.js"
const router=express.Router();
router.post("/checkout",checkout)
router.post("/verify-payment",verify)
router.get("/userOrder",verifyToken,userOrder)
router.get("/allOrders",allOrders)
router.get("/confirm-Payment",confirmPayment);


export default router