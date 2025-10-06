import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseCharts from './components/ExpenseCharts';
import DailySummaryAndNotes from './components/DailySummaryAndNotes';
import './App.css'; 

const API_URL = 'http://localhost:5000/api/expenses'; 

function App() {
    const [expenses, setExpenses] = useState([]);
    const [salaryGiven, setSalaryGiven] = useState(26000); 
    const [monthlyNotes, setMonthlyNotes] = useState("Reminder: Check the GRT and Tution fees before the 10th."); 
    const [isLoading, setIsLoading] = useState(true); 

    // --- Core Data Handlers ---

    const fetchExpenses = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                throw new Error('Failed to fetch expenses');
            }
            const data = await res.json();
            setExpenses(data);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    useEffect(() => {
        // Timer for the splash screen transition (4500ms)
        const timer = setTimeout(() => {
            setIsLoading(false); 
        }, 4500); 
        
        fetchExpenses();
        return () => clearTimeout(timer);
    }, []); 

    const handleNewExpense = (newExpense) => {
        setExpenses(prevExpenses => [newExpense, ...prevExpenses]); 
    };

    // NEW FUNCTION: Handles deleting an expense
    const handleDeleteExpense = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE', // Uses the new DELETE route
            });

            if (!res.ok) {
                throw new Error('Failed to delete expense.');
            }

            // Update UI by filtering out the deleted item
            setExpenses(prevExpenses => prevExpenses.filter(expense => (expense._id || expense.id) !== id));
            
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Could not delete expense. Check console for details.");
        }
    };


    const handleSalaryChange = (e) => {
        setSalaryGiven(parseFloat(e.target.value) || 0); 
    };

    const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);

    // --- RENDER LOGIC ---

    if (isLoading) {
        return (
            <div className="splash-screen">
                <p className="initial-welcome">Welcome back</p>
                <h1 className="name-transition">Vishwanath</h1>
            </div>
        );
    }

    return (
        <div className="app-container main-content-loaded">
            <header>
                <h2>Family Monthly Expenditure Tracker</h2> 
            </header>
            
            <div className="salary-input-area">
                <label htmlFor="salary">Monthly Budget (₹)</label>
                <input 
                    id="salary"
                    type="number" 
                    value={salaryGiven} 
                    onChange={handleSalaryChange} 
                />
            </div>

            <div className="dashboard-summary">
                <div className="summary-card total">Total Spent: ₹{totalSpent.toFixed(2)}</div>
                <div className="summary-card given">Amount Given: ₹{salaryGiven.toFixed(2)}</div>
                <div className="summary-card remaining">Remaining: ₹{(salaryGiven - totalSpent).toFixed(2)}</div>
            </div>
            
            <main className="content-layout">
                <div className="form-area">
                    <ExpenseForm onNewExpense={handleNewExpense} />
                    
                    <DailySummaryAndNotes 
                        expenses={expenses} 
                        notes={monthlyNotes} 
                        setNotes={setMonthlyNotes} 
                    />
                </div>
                
                <div className="visualization-area">
                    <ExpenseCharts expenses={expenses} /> 
                    
                    <div className="recent-list">
                        <h3>Recent Transactions ({expenses.length})</h3>
                        <ul>
                            {expenses.slice(0, 10).map(exp => ( // Increased list size for easier deletion
                                <li key={exp._id || exp.id}> 
                                    <span>**{exp.category}** on {new Date(exp.date).toLocaleDateString()}:</span>
                                    <span>
                                        ₹{exp.amount.toFixed(2)}
                                        {/* DELETE BUTTON INTEGRATED HERE */}
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDeleteExpense(exp._id || exp.id)}
                                        >
                                            🗑️ Delete
                                        </button>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;