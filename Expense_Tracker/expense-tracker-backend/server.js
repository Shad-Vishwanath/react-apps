// expense-tracker-backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = 5000; 

// Middleware setup
app.use(cors()); 
app.use(express.json()); 

// --- 🚨 Configuration: MongoDB URI ---
// !!! REPLACE THIS LINE with your actual MongoDB Atlas connection string !!!
const MONGODB_URI = 'mongodb+srv://VishwaDB:Qwerty9840468209@vishwadb.yag9gpy.mongodb.net/expenseDB?retryWrites=true&w=majority&appName=VishwaDB';
// ------------------------------------

// Database Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connection successful!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/expenses', expenseRoutes);

// Basic Home Route (for testing server)
app.get('/', (req, res) => {
    res.send('Expense Tracker Backend is online!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});