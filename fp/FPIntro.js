/**
 * FP core features:
 *
 * 1 - no side effects:
 * 	Functions do no change (mutate) value on labels in global memory.
 * 	The only value evaluated is that one returned by the function.
 * 	This makes the function very preditable
 *
 * 2 - higher order functions:
 * 	functions can accept other functions as arguments, and can return
 * 	other functions
 */

// Challenge 1
function addTwo(num) {
	return num + 2;
}

// To check if you've completed it, uncomment these console.logs!
console.log(addTwo(3));
console.log(addTwo(10));

// Challenge 2
function addS(word) {
	return `${word}s`;
}

// uncomment these to check your work
console.log(addS('pizza'));
console.log(addS('bagel'));

// Challenge 3
function map(array, callback) {
	const arr = [];
	for (let num of array) {
		arr.push(callback(num));
	}
	return arr;
}

console.log(map([1, 2, 3], addTwo));

// Challenge 4
function forEach(array, callback) {
	for (let n of array) {
		callback(n);
	}
}

forEach(['hello', 'there', 'yo'], function(num) {
	console.log(num);
});

//--------------------------------------------------
// Extension
//--------------------------------------------------

//Extension 1
function mapWith(array, callback) {
	const arr = [];
	array.forEach(item => {
		arr.push(callback(item));
	});
	return arr;
}

console.log(mapWith([5, 6, 7], addTwo));

//Extension 2
function reduce(array, callback, initialValue) {
	let accumulator = initialValue;
	array.forEach(element => {
		accumulator = callback(accumulator, element);
	});
	return accumulator;
}

function add(a, b) {
	return a + b;
}

function substract(a, b) {
	return a - b;
}

console.log(reduce([1, 2, 3], add, 0));
console.log(reduce([1, 2, 3], substract, 10));

//Extension 3
function intersection(...arrays) {
	return arrays.reduce(function(accumulator, next) {
		accumulator.forEach(function(element) {
			if (next.indexOf(element) === -1) {
				accumulator.splice(accumulator.indexOf(element), 1);
			}
		});
		return accumulator;
	});
}

console.log(
	intersection([5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]),
);
// should log: [5, 15]

//Extension 4
function union(...arrays) {
	return arrays.reduce(function(accumulator, next) {
		next.forEach(function(element) {
			if (accumulator.indexOf(element) === -1) {
				accumulator.push(element);
			}
		});
		return accumulator;
	}, []);
}

console.log(union([5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]));
// should log: [5, 10, 15, 88, 1, 7, 100]

//Extension 5
function objOfMatches(array1, array2, callback) {
	const obj = {};
	array1.forEach(function(element, index) {
		const property = element;
		const value = array2[index];
		if (callback(property) === value) {
			obj[property] = value;
		}
	});
	return obj;
}

console.log(
	objOfMatches(
		['hi', 'howdy', 'bye', 'later', 'hello'],
		['HI', 'Howdy', 'BYE', 'LATER', 'hello'],
		function(str) {
			return str.toUpperCase();
		},
	),
);
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

//Extension 6
function multiMap(arrVals, arrCallbacks) {
	const obj = {};
	arrVals.forEach(function(property) {
		obj[property] = arrCallbacks.map(function(callback) {
			return callback(property);
		});
	});
	return obj;
}

console.log(
	multiMap(
		['catfood', 'glue', 'beer'],
		[
			function(str) {
				return str.toUpperCase();
			},
			function(str) {
				return str[0].toUpperCase() + str.slice(1).toLowerCase();
			},
			function(str) {
				return str + str;
			},
		],
	),
);
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }
