/**
 * Performs Binary Search on a sorted array.
 * 
 * {number[]} array - The input array (can be unsorted).
 * {number} target - The value to search for.
 * {number | Object} - Returns the index of the target if found, 
 *                              or -1 if not found, or an error object if input is invalid.
 */
const binarySearch = (arr, target) => {
    try {
        // 🔹 Validate input: Ensure `arr` is an array
        if (!Array.isArray(arr)) {
            throw new Error("Input must be an array.");
        }

        // 🔹 Validate input: Ensure array is not empty
        if (arr.length === 0) {
            throw new Error("Array is empty. Binary search cannot be performed.");
        }

        // 🔹 Validate input: Ensure all elements in `arr` are numbers
        if (!arr.every(item => typeof item === "number")) {
            throw new Error("Array must contain only numbers.");
        }

        // 🔹 Validate input: Ensure `target` is a number
        if (typeof target !== "number") {
            throw new Error("Target value must be a number.");
        }

        // 🔹 Sort the array (since Binary Search requires a sorted array)
        const sortedArr = [...arr].sort((a, b) => a - b);

        let left = 0, right = sortedArr.length - 1;

        // 🔹 Implement Binary Search
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);

            if (sortedArr[mid] === target) return mid; // Found the target, return index
            sortedArr[mid] < target ? (left = mid + 1) : (right = mid - 1);
        }

        return -1; // Target not found
    } catch (error) {
        return { error: error.message }; // Return detailed error message
    }
};

module.exports = binarySearch; // Export function for external use
