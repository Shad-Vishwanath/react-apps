// expense-tracker-backend/models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'No description' 
    },
    date: {
        type: Date,
        required: true,
    },
}, { timestamps: true }); 

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;