const express = require('express');
const binarySearch = require('../algorithms/binarySearch');
const quickSort = require('../algorithms/quickSort');
const bfs = require('../algorithms/bfs');
const logApiCall = require('../utils/logger');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const logFilePath = path.join(__dirname, '../../logs/api_log.json')

router.post('/binary-search', (req, res) => {
    const { array, target } = req.body;
    if (!Array.isArray(array) || typeof target !== 'number') {
        return res.status(400).json({ error: 'Invalid input format Either the array or target, and make sure naming to be array and target' });
    }
    const sortedArray = [...array].sort((a, b) => a - b);
    const index = binarySearch(sortedArray, target);
    logApiCall("Binary Search", { array: sortedArray, target }, { index });
    res.json({ sortedArray, index });
});

router.post('/quick-sort', (req, res) => {
    const { array } = req.body;
    if (!Array.isArray(array)) {
        return res.status(400).json({ error: 'Invalid input format, make sure the naming to be array' });
    }
    if (array.length === 0) {
        return res.status(400).json({ error: "Array size 0. Cannot sort." });
    }
    if (!array.every(item => typeof item === "number")) {
        return res.status(400).json({ error: "Invalid datatype. Array must contain only numbers." });
    }
    const sortedArray = quickSort(array);
    logApiCall("Quick Sort", { array }, { sortedArray });
    res.json({ sortedArray });
});

router.post('/bfs', (req, res) => {
    const { graph, startNode } = req.body;
    if (typeof graph !== 'object' || typeof startNode !== 'string') {
        return res.status(400).json({ error: 'Invalid input format, either input parameters or values, make sure naming to be graph and startNode' });
    }
    const traversal = bfs(graph, startNode);
    logApiCall("BFS", { graph, startNode }, { traversal });
    res.json({ traversal });
});

router.get('/logs', (req, res) => {
    if (!fs.existsSync(logFilePath)) {
        return res.status(404).json({ message: "No logs found" });
    }
    const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
    res.json(logs);
});

module.exports = router;