const { Pool } = require('pg');

// PostgreSQL Connection Setup
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "digantara_logs",
    password: "Rushi007*", 
    port: 5432,
});

// Function to log API calls to PostgreSQL
const logApiCall = async (algorithmName, input, output, error = null) => {
    try {
        await pool.query(
            "INSERT INTO api_logs (algorithm_name, input_data, output_data, error_message) VALUES ($1, $2, $3, $4)",
            [algorithmName, input, output, error]
        );
    } catch (err) {
        console.error("Error logging API call:", err.message);
    }
};

module.exports = logApiCall;