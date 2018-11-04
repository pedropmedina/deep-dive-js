const R = require('ramda');

// --------------------------------------------------------
// composition is when the output of a function becomes the
// input of another function
function sum(x, y) {
	return x + y;
}

function mult(x, y) {
	return x * y;
}

function sumAndMult(x, y, z) {
	return sum(mult(x, y), z); // the output of mult becomes the input of sum
}

console.log(sumAndMult(2, 3, 4));

// --------------------------------------------------------
// automate the creation of sumAndMult with pipes
// which is a function that takes functions as arguments
// and returns a function that takes the arguments to be
// passed to the functions
function pipe(fn1, fn2) {
	return function piped(arg1, arg2, arg3) {
		return fn1(fn2(arg1, arg2), arg3);
	};
}

const sumAndMult1 = pipe(
	sum,
	mult,
);
console.log(sumAndMult1(2, 3, 4));

// --------------------------------------------------------
// unary functions are easier to compose. When posible ensure
// that functions are unary instead of binary or n-ary.
// More on arity here: https://en.wikipedia.org/wiki/Arity

function addBy2(n) {
	return n + 2;
}

function multBy2(n) {
	return n * 2;
}

function divBy2(n) {
	return n / 2;
}

// compose -> executes functions right to left
function compose(...fns) {
	return function composed(result) {
		for (let i = fns.length - 1; i >= 0; i--) {
			result = fns[i](result);
		}
		return result;
	};
}
const composeOutput = compose(
	addBy2,
	multBy2,
	divBy2,
)(3);

console.log(composeOutput);

// --------------------------------------------------------
// pipe executes functions left to right
function pipe2(...fns) {
	return compose(...fns.reverse());
}
const pipeOutput = pipe2(addBy2, multBy2, divBy2)(3);

console.log(pipeOutput);

// --------------------------------------------------------
// Maybe handles cases in which val is undefined or null
const Maybe = val => ({
	val,
	fmap(fn) {
		if (!this.val) return Maybe(null);
		return Maybe(fn(this.val));
	},
});

const getFirstName = maybeName => maybeName.fmap(name => name.split(' ')[0]);
const getFirstLetter = maybeString => maybeString.fmap(string => string[0]);

const firstInitial = R.compose(
	getFirstLetter,
	getFirstName,
);

console.log(firstInitial(Maybe('Luca Medina')).val); // L
console.log(firstInitial(Maybe()).val); // null
