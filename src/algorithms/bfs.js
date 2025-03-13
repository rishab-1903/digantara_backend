const bfs = (graph, startNode) => {
    let queue = [startNode];
    let visited = new Set(queue);
    let result = [];

    while (queue.length > 0) {
        let node = queue.shift();
        result.push(node);

        for (let neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
};

module.exports = bfs;