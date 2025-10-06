import React, { useState } from 'react';

// Paste this new value into the API_URL constant in both files:

const API_URL = 'https://vishwa-tracker-api.onrender.com/api/expenses';
const DEFAULT_CATEGORIES = [
    'Groceries', 'Veggies', 'Snacks', 'Milk', 'Non-Veg', 'Online', 
    'Petrol', 'Other Expenses', 'Cylinder', 'GRT', 'Tution', 'EB'
];

function ExpenseForm({ onNewExpense }) {
    const [formData, setFormData] = useState({
        amount: '',
        category: DEFAULT_CATEGORIES[0], 
        description: '',
        date: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // CHANGE 4: Handler for category buttons
    const handleCategoryClick = (category) => {
        setFormData(prev => ({ ...prev, category }));
    };


    const handleSubmit = async (e) => { 
        e.preventDefault();
        
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });

            if (!res.ok) {
                throw new Error('Failed to log expense on server.');
            }

            const savedExpense = await res.json();
            onNewExpense(savedExpense); 

            // Reset only amount and description fields for rapid entry
            setFormData(prev => ({
                ...prev,
                amount: '',
                description: '',
            }));

        } catch (error) {
            console.error("Submission Error:", error);
            alert("Failed to submit expense. Is the backend server running?");
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="expense-form">
            <h3>Log a New Expenditure</h3>
            
            {/* Amount Input First for Quick Entry */}
            <label>Amount (₹)</label>
            <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                required 
                placeholder="0.00"
            />
            
            {/* Description Input */}
            <label>Description</label>
            <input 
                type="text" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="e.g., Lunch, EB bill"
            />

            {/* CHANGE 4: Category Buttons */}
            <label>Select Category (Current: **{formData.category}**)</label>
            <div className="category-buttons">
                {DEFAULT_CATEGORIES.map((cat, index) => (
                    <button 
                        key={index} 
                        type="button" 
                        onClick={() => handleCategoryClick(cat)}
                        className={formData.category === cat ? 'selected-cat' : ''}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Date input remains, moved to the bottom */}
            <label>Date</label>
            <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
            />
            
            <button type="submit">Add Expense</button>
        </form>
    );
}

export default ExpenseForm;