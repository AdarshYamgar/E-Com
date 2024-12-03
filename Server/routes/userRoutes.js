import express from "express"
import {register,login,forgotPassword,ResetPassword, profile, UpdateProfile} from "../controllers/userController.js";
import { verifyToken } from "../Middleware/auth.js";

const router=express.Router();
router.post("/register",register);
console.log("I am user route")

router.post("/login",login);
router.post("/forgot",forgotPassword)
router.post("/reset",ResetPassword)
router.get("/profile",verifyToken,profile)
router.put("/updateProfile/:id",UpdateProfile)

export default router;