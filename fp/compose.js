// implementation with recursion
const compose = (a, ...rest) => {
	// rest.length === 0 ? a : c => a(compose(...rest)(c));
	debugger;
	if (rest.length === 0) {
		return a;
	} else {
		return function inner(argument) {
			return a(compose(...rest)(argument));
		};
	}
};

// implementation with reduce
const compose2 = (...args) => {
	return value => args.reverse().reduce((acc, fn) => fn(acc), value);
};

function addBy2(x) {
	return x + 2;
}
function multBy2(x) {
	return x * 2;
}
function squared(x) {
	return x ** 2;
}

const r = compose(
	squared,
	multBy2,
	addBy2,
)(3);
console.log(r);

const r2 = compose2(squared, multBy2, addBy2)(3);
console.log(r2);
