require('dotenv').config();
const { Pool } = require('pg');

// Debug: Log DATABASE_URL to verify if it's detected
console.log("DATABASE_URL:", process.env.DATABASE_URL || "Using local PostgreSQL");

// Automatically detect production vs. local environment
const isProduction = process.env.DATABASE_URL !== undefined;

// PostgreSQL Connection Setup (Works for Both Local & Render)
const pool = new Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL  // Use Render's database connection string
        : "postgres://postgres:Rushi007*@localhost:5432/digantara_logs", // Local database
    ssl: isProduction ? { rejectUnauthorized: false } : false  // Enable SSL only in production
});

// Function to log API calls to PostgreSQL
const logApiCall = async (algorithmName, input, output, error = null) => {
    try {
        await pool.query(
            "INSERT INTO api_logs (algorithm_name, input_data, output_data, error_message) VALUES ($1, $2, $3, $4)",
            [algorithmName, input, output, error]
        );
        console.log(`Log saved: ${algorithmName}`);
    } catch (err) {
        console.error("Error logging API call:", err.message);
    }
};

module.exports = logApiCall;