/**
 * Performs Breadth-First Search (BFS) on a graph.
 * 
 * {Object} graph - An adjacency list representation of the graph.
 * {string} startNode - The node from which BFS traversal begins.
 * {Array} - An array representing the BFS traversal order.
 */
const bfs = (graph, startNode) => {
    if (!graph[startNode]) {
        return { error: "Start node not found in the graph." };
    }
    let queue = [startNode]; // Initialize queue with the start node
    let visited = new Set(queue); // Use a Set to track visited nodes (faster lookup)
    let result = []; // Stores the order of visited nodes

    // BFS Loop: Continue while there are nodes to explore
    while (queue.length > 0) {
        let node = queue.shift(); // Dequeue the first node
        result.push(node); // Add it to the result (visited order)

        // Traverse neighbors of the current node (if any)
        for (let neighbor of (graph[node] || [])) { 
            if (!visited.has(neighbor)) { // If the neighbor hasn’t been visited yet
                visited.add(neighbor); // Mark it as visited
                queue.push(neighbor); // Enqueue for future exploration
            }
        }
    }

    return result; // Return the BFS traversal order
};

module.exports = bfs; // Export the function for use in other files
