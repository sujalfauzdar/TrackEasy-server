import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    totalBudget: { type: Number, required: true },
    remainingBudget: { type: Number, required: true },
    expenses: [
        {
            category: { type: String, required: true },
            amount: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
});

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
