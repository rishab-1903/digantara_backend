const express = require('express');
const binarySearch = require('../algorithms/binarySearch');
const quickSort = require('../algorithms/quickSort');
const bfs = require('../algorithms/bfs');
const logApiCall = require('../utils/logger');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const logFilePath = path.join(__dirname, '../../logs/api_log.json');

/**
 * @route POST /api/binary-search
 * @desc Performs Binary Search on a sorted array.
 * @access Public
 */
router.post('/binary-search', (req, res) => {
    const { array, target } = req.body;
    // Input Validation
    if (!Array.isArray(array) || typeof target !== 'number') {
        return res.status(400).json({ error: 'Invalid input format. Ensure "array" is an array and "target" is a number.' });
    }
    // Sorting before applying Binary Search (since BS requires a sorted array)
    const sortedArray = [...array].sort((a, b) => a - b);
    const index = binarySearch(sortedArray, target);
    // Log API call
    logApiCall("Binary Search", { array: sortedArray, target }, { index });

    res.json({ sortedArray, index });
});

/**
 * @route POST /api/quick-sort
 * @desc Sorts an array using the Quick Sort algorithm.
 * @access Public
 */
router.post('/quick-sort', (req, res) => {
    const { array } = req.body;
    // Input Validation
    if (!Array.isArray(array)) {
        return res.status(400).json({ error: 'Invalid input format. Ensure "array" is an array.' });
    }
    if (array.length === 0) {
        return res.status(400).json({ error: "Array size 0. Cannot sort." });
    }
    if (!array.every(item => typeof item === "number")) {
        return res.status(400).json({ error: "Invalid datatype. Array must contain only numbers." });
    }
    // Sort the array using Quick Sort
    const sortedArray = quickSort(array);
    // Log API call
    logApiCall("Quick Sort", { array }, { sortedArray });
    res.json({ sortedArray });
});

/**
 * @route POST /api/bfs
 * @desc Performs Breadth-First Search (BFS) on a graph.
 * @access Public
 */
router.post('/bfs', (req, res) => {
    const { graph, startNode } = req.body;
    // Input Validation
    if (typeof graph !== 'object' || typeof startNode !== 'string') {
        return res.status(400).json({ error: 'Invalid input format. Ensure "graph" is an object and "startNode" is a string.' });
    }
    // Perform BFS Traversal
    const traversal = bfs(graph, startNode);
    // Log API call
    logApiCall("BFS", { graph, startNode }, { traversal });
    res.json({ traversal });
});


module.exports = router;