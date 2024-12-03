import { Expense } from "../models/Expense.js";

export const getExpense=async(req,res)=>{
    try{
        let expense=await Expense.find().sort({createdAt:-1})
         res.json(expense)
    }catch(error){
        res.status(500).json({error:"Failed to fetch all expense"})

    }
}