// expense-tracker-backend/routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Import the Expense Model

// @route   POST /api/expenses
// @desc    Create a new expense record
router.post('/', async (req, res) => {
    try {
        const newExpense = new Expense({
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
            date: new Date(req.body.date), 
        });

        const expense = await newExpense.save();
        res.status(201).json(expense);
    } catch (err) {
        console.error("Error saving expense:", err.message);
        res.status(500).send('Server Error during POST request.');
    }
});

// @route   GET /api/expenses
// @desc    Get all expense records
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error("Error fetching expenses:", err.message);
        res.status(500).send('Server Error during GET request.');
    }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense record by ID
router.delete('/:id', async (req, res) => {
    try {
        // Use findByIdAndDelete to remove the record based on the MongoDB _id
        const result = await Expense.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ msg: 'Expense not found' });
        }
        
        // Send a success confirmation back to the frontend
        res.json({ msg: 'Expense deleted successfully', id: req.params.id });
    } catch (err) {
        console.error("Error deleting expense:", err.message);
        res.status(500).send('Server Error: Invalid ID format.');
    }
});

module.exports = router;