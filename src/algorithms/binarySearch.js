const binarySearch = (arr, target) => {
    try {
        if (!Array.isArray(arr)) {
            throw new Error("Input must be an array.");
        }
        if (arr.length === 0) {
            throw new Error("Array is empty. Binary search cannot be performed.");
        }
        if (!arr.every(item => typeof item === "number")) {
            throw new Error("Array must contain only numbers.");
        }
        if (typeof target !== "number") {
            throw new Error("Target value must be a number.");
        }
        const sortedArr = [...arr].sort((a, b) => a - b);

        let left = 0, right = sortedArr.length - 1;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (sortedArr[mid] === target) return mid;
            sortedArr[mid] < target ? (left = mid + 1) : (right = mid - 1);
        }

        return -1;
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = binarySearch;