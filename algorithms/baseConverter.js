const Stack = require('../data-structures/stack');

function baseConverted(decNumber, base) {
	const remStack = new Stack();
	let rem;
	let baseString = '';
	let digits = '0123456789ABCDEF';

	while (decNumber > 0) {
		rem = Math.floor(decNumber % base);
		remStack.push(rem);
		decNumber = Math.floor(decNumber / base);
	}

	while (!remStack.isEmpty()) {
		baseString += digits[remStack.pop()];
	}

	return baseString;
}

const binary = baseConverted(10, 2);
const binary1 = baseConverted(11, 2);
const binary2 = baseConverted(1241, 2);
const octagonal = baseConverted(10, 8);
const hexodecimal = baseConverted(10, 16);

console.log(binary);
console.log(binary1);
console.log(binary2);
console.log(octagonal);
console.log(hexodecimal);
