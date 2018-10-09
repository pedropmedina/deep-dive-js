function bubbleSort(numsArr) {
	let swapped = false;
	do {
		swapped = false;
		for (let i = 0; i < numsArr.length; i++) {
			if (numsArr[i] > numsArr[i + 1]) {
				const temp = numsArr[i];
				numsArr[i] = numsArr[i + 1];
				numsArr[i + 1] = temp;
				swapped = true;
			}
		}
	} while (swapped);
	return numsArr;
}

const sortedNumsArr = bubbleSort([2, 3, 4, 1, 5, 8, 7]);
console.log(sortedNumsArr);
