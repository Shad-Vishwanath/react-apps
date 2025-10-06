// src/components/ExpenseCharts.jsx
import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    ArcElement, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Tooltip, 
    Legend 
} from 'chart.js';

// Register all Chart.js components needed for Pie and Bar charts
ChartJS.register(
    ArcElement, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Tooltip, 
    Legend
);

// --- Data Processor for PIE CHART (Category Breakdown) ---
const processDataForPieChart = (expenses) => {
    // 1. Group expenses by category and sum the amounts
    const aggregatedData = expenses.reduce((acc, expense) => {
        const category = expense.category;
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
    }, {});

    const labels = Object.keys(aggregatedData);
    const data = Object.values(aggregatedData);
    
    // Dynamic color array 
    const backgroundColors = labels.map((_, index) => {
        const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
            '#FF9F40', '#E7E9ED', '#C9CBCE', '#A3D900', '#FF5733', 
            '#C70039', '#900C3F'
        ];
        return colors[index % colors.length];
    });

    return {
        labels,
        datasets: [{
            label: 'Amount Spent (₹)',
            data,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColors.map(color => color + 'CC'),
        }],
    };
};

// --- Data Processor for BAR CHART (Monthly Trend) ---
const processDataForBarChart = (expenses) => {
    const monthlyData = expenses.reduce((acc, expense) => {
        // Extract the month (YYYY-MM) from the 'date' field
        const monthKey = expense.date.substring(0, 7); 
        acc[monthKey] = (acc[monthKey] || 0) + expense.amount;
        return acc;
    }, {});

    // Sort months chronologically
    const sortedKeys = Object.keys(monthlyData).sort();

    return {
        labels: sortedKeys,
        datasets: [
            {
                label: 'Total Spending (₹)',
                data: sortedKeys.map(key => monthlyData[key]),
                backgroundColor: '#00A86B', 
                borderColor: '#00563F',
                borderWidth: 1,
            },
        ],
    };
};


function ExpenseCharts({ expenses }) {
    if (expenses.length === 0) {
        return <p>Log some expenses to see the charts!</p>;
    }

    const pieChartData = processDataForPieChart(expenses);
    const barChartData = processDataForBarChart(expenses);

    return (
        <div className="charts-container">
            <div className="chart-item">
                <h3>Category Breakdown (Pie Chart)</h3>
                <div style={{ height: '300px', width: '100%' }}>
                    <Pie 
                        data={pieChartData} 
                        options={{ maintainAspectRatio: false }} 
                    />
                </div>
            </div>

            <div className="chart-item">
                <h3>Monthly Spending Trend (Bar Chart)</h3>
                <div style={{ height: '300px', width: '100%' }}>
                    <Bar 
                        data={barChartData} 
                        options={{ 
                            maintainAspectRatio: false,
                            scales: { y: { beginAtZero: true } }
                        }} 
                    />
                </div>
            </div>
        </div>
    );
}

export default ExpenseCharts;