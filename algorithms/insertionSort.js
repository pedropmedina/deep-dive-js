/*
	i -> keeps track of the unsorted array
	j -> keep track of the item in the already sorted side of the array up to
		the item preciding i

	i's condition is loop arr as long as i < arr.length
	j's condition is loop arr as long as j < i

	if i is less than j
		1 - remove item at i from array
		2 - insert removed item at i and inserted at j position
*/
function insertionSort(numsArr) {
	for (let i = 1; i < numsArr.length; i++) {
		for (let j = 0; j < i; j++) {
			if (numsArr[i] < numsArr[j]) {
				const spliced = numsArr.splice(i, 1);
				numsArr.splice(j, 0, spliced[0]);
			}
		}
	}
	return numsArr;
}

const sortedArr = insertionSort([2, 5, 3, 4, 7, 6, 12, 11, 1]);
console.log(sortedArr);
