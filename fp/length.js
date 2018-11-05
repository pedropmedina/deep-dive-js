// This checks the length of an array.
// Notice the use of destructuring and gathering within the same array
const length = ([first, ...rest]) =>
	first === undefined ? 0 : 1 + length(rest);

console.log(length(['one', 'two', 'three']));
console.log(length([]));
