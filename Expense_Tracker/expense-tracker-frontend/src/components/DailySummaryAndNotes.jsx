// src/components/DailySummaryAndNotes.jsx
import React from 'react';

function DailySummaryAndNotes({ expenses, notes, setNotes }) {
    // Get today's date in YYYY-MM-DD format for filtering
    const today = new Date().toISOString().split('T')[0];
    
    // Filter and calculate expenses for today
    const todayExpenses = expenses.filter(exp => 
        // Ensure date comparison is accurate
        new Date(exp.date).toISOString().split('T')[0] === today
    );
    const todayTotal = todayExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div className="daily-notes-area">
            {/* 1. Today's Data Summary */}
            <div className="daily-summary-card">
                <h4>Today's Spending ({new Date().toLocaleDateString()})</h4>
                <p className="today-total">Total: **₹{todayTotal.toFixed(2)}**</p>
                <ul>
                    {todayExpenses.map(exp => (
                        <li key={exp._id || exp.id}>
                            {exp.category}: ₹{exp.amount.toFixed(2)}
                        </li>
                    ))}
                    {todayExpenses.length === 0 && <li>No expenses logged today.</li>}
                </ul>
            </div>
            
            {/* 2. Notes Area */}
            <div className="notes-section">
                <h4>Monthly Notes</h4>
                <textarea
                    rows="5"
                    placeholder="Add notes here (e.g., 'Need to pay EB by Friday')."
                    value={notes}
                    // Handler to update the notes state in the parent component (App.jsx)
                    onChange={(e) => setNotes(e.target.value)} 
                />
            </div>
        </div>
    );
}

export default DailySummaryAndNotes;