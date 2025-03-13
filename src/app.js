const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Middleware to enable CORS (Cross-Origin Resource Sharing)
const algorithmRoutes = require('./routes/algorithms'); // Importing algorithm-related routes
const analyticsRoutes = require('./routes/analytics'); // Importing analytics-related routes

const app = express();
// Middleware Configuration
app.use(cors()); // Allows requests from different origins
app.use(bodyParser.json()); // Parses incoming JSON requests
// Register API Routes
app.use('/api', algorithmRoutes); // Handles algorithm-related requests (Binary Search, Quick Sort, BFS)
app.use('/api', analyticsRoutes); // Handles analytics requests (API usage tracking)
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));