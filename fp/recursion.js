'use strict';
// PTC (Proper Tail Call) only works in strict mode

// sumInter version 1
function sumInter(sum, num, ...nums) {
	if (nums.length) {
		return sum + sumInter(num, ...nums);
	}
	return sum + num;
}

console.log(sumInter(1, 2, 3, 4, 5, 6));

// sumInter version 2
function sumInterV2(sum, num, ...nums) {
	if (nums.length === 0) {
		return sum + num;
	}
	return sum + sumInterV2(num, ...nums);
}

console.log(sumInterV2(1, 2, 3, 4, 5, 6));

// this solution takes advantage of PTC
function sumInterV3(sum, num, ...nums) {
	if (nums.length === 0) return sum + num;
	return sumInterV3(sum + num, ...nums);
}

console.log(sumInterV3(1, 2, 3, 4, 5, 6));

// clean implementation of sumInter that abstracts away
// its recursive implementation
function sumInterV4(...args) {
	return _sumInter(...args);

	function _sumInter(sum, num, ...args) {
		sum += num;
		if (args.length === 0) return sum;
		return _sumInter(sum, ...args);
	}
}

console.log(sumInterV4(1, 2, 3, 4, 5, 6));

// The code above in sumInterV4 has a problem, as it'll
// define _sumInter every time it is called. A solution to
// it is to wrap the whole thing in an IIFE
const sumInterV5 = (function() {
	return function(...nums) {
		return _sumInter(...nums);
	};

	function _sumInter(sum, num, ...nums) {
		sum += num;
		if (nums.length === 0) return sum;
		return _sumInter(sum, ...nums);
	}
})();

console.log(sumInterV5(1, 2, 3, 4, 5, 6));
