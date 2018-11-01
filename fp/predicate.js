// In mathematical logic, a predicate is commonly understood to be a Boolean-valued function P: X→ {true, false}, called the predicate on X. https://en.wikipedia.org/wiki/Predicate_(mathematical_logic)

function not(fn) {
	return function negate(...args) {
		return !fn(...args);
	};
}

function isEven(x) {
	return x % 2 === 0;
}

function isOdd(x) {
	return x % 2 !== 0;
}

const even = not(isOdd)(4);
console.log(even);

const odd = not(isEven)(5);
console.log(odd);
