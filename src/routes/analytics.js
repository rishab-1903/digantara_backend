require('dotenv').config();  // Load environment variables
const { Pool } = require('pg');
const express = require("express");


const router = express.Router();

// Automatically detect production vs. local environment
const isProduction = process.env.DATABASE_URL !== undefined;

// PostgreSQL Connection Setup
const pool = new Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL  // Use Render's database connection string
        : "postgres://postgres:Rushi007*@localhost:5432/digantara_logs", // Local database
    ssl: isProduction ? { rejectUnauthorized: false } : false  // Enable SSL only in production
});

// API to get log analytics
router.get("/analytics", async (req, res) => {
    try {
        const mostUsedAlgorithm = await pool.query(`
            SELECT algorithm_name, COUNT(*) as count
            FROM api_logs
            GROUP BY algorithm_name
            ORDER BY count DESC
            LIMIT 1;
        `);

        const avgExecutionTime = await pool.query(`
            SELECT algorithm_name, AVG(EXTRACT(EPOCH FROM (now() - timestamp))) * 1000 AS avg_execution_time
            FROM api_logs
            GROUP BY algorithm_name;
        `);

        const totalApiCalls = await pool.query(`
            SELECT COUNT(*) AS total_calls FROM api_logs;
        `);

        res.json({
            most_used_algorithm: mostUsedAlgorithm.rows[0] || "No data",
            average_execution_time: avgExecutionTime.rows,
            total_api_calls: totalApiCalls.rows[0]?.total_calls || 0,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// API to fetch logs from PostgreSQL
router.get('/logs-from-db', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM api_logs ORDER BY timestamp DESC LIMIT 50");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;