/**
 * Implements the Quick Sort algorithm.
 * 
 * {number[]} array - The array of numbers to be sorted.
 * {number[]} - A new array sorted in ascending order.
 */
const quickSort = (arr) => {
        // 🔹 Base case: If the array has 0 or 1 elements, it's already sorted
        if (arr.length <= 1) return arr;
    
        // 🔹 Choose pivot as the last element of the array
        let pivot = arr[arr.length - 1];
    
        // 🔹 Partition the array into two parts:
        // `left` contains elements smaller than the pivot
        let left = arr.filter(el => el < pivot);
        
        // `right` contains elements greater than the pivot
        let right = arr.filter(el => el > pivot);
    
        // 🔹 Recursively sort left and right parts, and combine them with pivot
        return [...quickSort(left), pivot, ...quickSort(right)];
    };
    
    module.exports = quickSort; // Export function for external use
    