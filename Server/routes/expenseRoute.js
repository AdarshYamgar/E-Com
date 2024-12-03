// import express from "express";
// import { addAddress, getAddress } from "../controllers/addressController.js";
// import { verifyToken } from "../Middleware/auth.js";
// const router=express.Router()

// router.post("/add",verifyToken,addAddress)

// router.get("/get",verifyToken,getAddress)
// export default router;

import express from "express";
import {getExpense} from "../controllers/expenseController.js";
const router=express.Router()

router.get("/getExpense",getExpense)
export default router;