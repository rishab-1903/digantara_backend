const express = require("express");
const { Pool } = require("pg");

const router = express.Router();

// PostgreSQL Connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "digantara_logs",
    password: "Rushi007*",
    port: 5432,
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
            SELECT algorithm_name, AVG(EXTRACT(EPOCH FROM (timestamp - now()))) * -1000 AS avg_execution_time
            FROM api_logs
            GROUP BY algorithm_name;
        `);

        const totalApiCalls = await pool.query(`
            SELECT COUNT(*) AS total_calls FROM api_logs;
        `);

        res.json({
            most_used_algorithm: mostUsedAlgorithm.rows[0] || "No data",
            average_execution_time: avgExecutionTime.rows,
            total_api_calls: totalApiCalls.rows[0].total_calls,
        });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;