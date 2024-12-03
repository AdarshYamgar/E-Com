import express from "express";
import { addAddress, getAddress } from "../controllers/addressController.js";
import { verifyToken } from "../Middleware/auth.js";
const router=express.Router()

router.post("/add",verifyToken,addAddress)

router.get("/get",verifyToken,getAddress)
export default router;