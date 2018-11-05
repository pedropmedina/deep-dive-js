// This checks the length of an array.
// Notice the use of destructuring and gathering within the same array
const length = ([first, ...rest]) =>
	first === undefined ? 0 : 1 + length(rest);

console.log(length(['one', 'two', 'three']));
console.log(length([]));

// length implementation with TCO (tail-call optimization)
// TCO is when a function's last act is
// calling another function

// prettier-ignore
const lengthTCO = ([first, ...rest], arrayLength) =>
	first === undefined
		? arrayLength
		: lengthTCO(rest, arrayLength + 1);

console.log(lengthTCO(['Bianca', 'Pedro', 'Philippe', 'Luca'], 0));
