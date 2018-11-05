// Following divide and conquer algorithm
// with linear recursion
const flatten = ([first, ...rest]) => {
	if (first === undefined) {
		return [];
	} else if (!Array.isArray(first)) {
		return [first, ...flatten(rest)];
	} else {
		return [...flatten(first), ...flatten(rest)];
	}
};

const flattened = flatten(['Bianca', ['Pedro', ['Philippe', ['Luca']]]]);
console.log(flattened);

// mapping over an array with linear recursion
const squaredAll = ([first, ...rest]) =>
	first === undefined ? [] : [first * first, ...squaredAll(rest)];

const squared = squaredAll([1, 2, 3, 4, 5]);
console.log(squared);
