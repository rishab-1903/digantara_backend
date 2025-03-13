const quickSort = (arr) => {
        if (arr.length <= 1) return arr;
        let pivot = arr[arr.length - 1];
        let left = arr.filter(el => el < pivot);
        let right = arr.filter(el => el > pivot);
        return [...quickSort(left), pivot, ...quickSort(right)];
};
module.exports = quickSort;