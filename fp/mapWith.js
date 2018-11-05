// prettier-ignore
const arr = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 29,
	20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 99, 10, 11, 12, 13, 14, 15, 16, 17, 18, 29, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 99
]

const mapWith = (fn, [first, ...rest]) =>
	first === undefined ? [] : [fn(first), ...mapWith(fn, rest)];

const addBy2 = x => x + 2;

console.log(mapWith(addBy2, arr));

// TCO for mapWith
// prettier-ignore
const mapTCO = (fn, [first, ...rest], prepend) =>
	first === undefined
		? prepend
		: mapTCO(fn, rest, [...prepend, fn(first)]);

console.log(mapTCO(addBy2, arr, []));

// factorial with recursion
const factorial = (num, total = 1) =>
	num === 1 ? total : factorial(num - 1, total * num);

console.log(factorial(5));
