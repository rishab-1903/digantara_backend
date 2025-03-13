const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Correct CORS import
const algorithmRoutes = require('./routes/algorithms');
const analyticsRoutes = require('./routes/analytics'); // Added analytics route

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', algorithmRoutes);
app.use('/api', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));