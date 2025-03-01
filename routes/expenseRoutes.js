import express from "express";
import { setBudget, addExpense, getExpenseData } from "../controllers/expenseController.js";
import userAuth from "../middleware/auth.js";

const router = express.Router();

router.post("/set-budget", userAuth, setBudget);
router.post("/add-expense", userAuth, addExpense);
router.get("/get-expense", userAuth, getExpenseData);

export default router;
