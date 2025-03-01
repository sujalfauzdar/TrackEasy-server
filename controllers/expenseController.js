import Expense from "../models/expenseModel.js";

// Set Initial Budget
export const setBudget = async (req, res) => {
    try {
        const { totalBudget } = req.body;
        const userId = req.body.userId;

        let expenseData = await Expense.findOne({ userId });

        if (expenseData) {
            return res.json({ success: false, message: "Budget already set!" });
        }

        const newBudget = new Expense({
            userId,
            totalBudget,
            remainingBudget: totalBudget,
            expenses: []
        });

        await newBudget.save();
        res.json({ success: true, message: "Budget set successfully!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Add an Expense
export const addExpense = async (req, res) => {
    try {
        const { amount, category } = req.body;
        const userId = req.body.userId;

        let expenseData = await Expense.findOne({ userId });

        if (!expenseData) {
            return res.json({ success: false, message: "Set a budget first!" });
        }

        if (expenseData.remainingBudget < amount) {
            return res.json({ success: false, message: "Insufficient budget!" });
        }

        expenseData.expenses.push({ category, amount });
        expenseData.remainingBudget -= amount;

        await expenseData.save();
        res.json({ success: true, message: "Expense added successfully!", expenseData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get Budget & Expenses
export const getExpenseData = async (req, res) => {
    try {
        const userId = req.body.userId;
        const expenseData = await Expense.findOne({ userId });

        if (!expenseData) {
            return res.json({ success: false, message: "No budget data found!" });
        }

        res.json({ success: true, expenseData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
