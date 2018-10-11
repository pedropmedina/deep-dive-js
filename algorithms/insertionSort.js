function insertionSortV1(numsArr) {
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

function insertionSortV2(nums) {
	for (let i = 1; i < nums.length; i++) {
		let element = nums[i];
		let j = i - 1;
		while (j >= 0 && nums[j] > element) {
			nums[j + 1] = nums[j];
			j--;
		}
		nums[j + 1] = element;
	}
	return nums;
}

function insertionSortV3(nums) {
	for (let i = 1; i < nums.length; i++) {
		// keep copy of current element for use throughout sorted arr
		let element = nums[i];
		// loop backwards starting at the element before current element
		for (let j = i - 1; j >= 0 && nums[j] > element; j--) {
			nums[j + 1] = nums[j];
			nums[j] = element;
		}
	}
	return nums;
}

const sortedArr = insertionSortV3([2, 55, 323, 44, 7, 6, 12, 11, 1]);
console.log(sortedArr);
