const R = require('ramda');

const Maybe = val => ({
	val,
	fmap(fn) {
		if (!this) return Maybe(null);
		return Maybe(fn(this.val));
	},
});

const map = (fn, functor) => functor.fmap(fn);

const getFirstName = name => name.split(' ')[0];
const getFirstLetter = string => string[0];

const getInitial = maybeName => {
	const maybeFirstName = map(getFirstName, maybeName);
	const maybeFirstLetter = map(getFirstLetter, maybeFirstName);
	return maybeFirstLetter;
};

console.log(getInitial(Maybe('Luca Medina')).val); // L

// ----------------------------------------------------------------
// Simplifying code above with curry

// We curry map. Map requires two arguments the fn and the maybe functor
const mapCurried = R.curry(map);

// Composed both mapCurried where the first argument is the
// fn that is going to get passed to the fmap functor.
// Starting from the right, we pass Maybe('Luca Medina') to the
// getInitial1 composed function which outputs another Maybe functors
// that will become the second input to mapCurried(getFirstLetter)
// This is what it looks like:
// mapCurried(getFirstLetter, mapCurried(getFirstName, Maybe('Luca Medina')))
// NOTE: Usually in FP, data comes last in a function.
const getInitial1 = R.compose(
	mapCurried(getFirstLetter),
	mapCurried(getFirstName),
);

console.log(getInitial1(Maybe('Luca Medina')).val);

// ----------------------------------------------------------------
// we can make map carry and this way it doesn't need to be used twice
const map1 = R.curry((fn, functor) => functor.fmap(fn));

const getInitial2 = map1(
	R.compose(
		getFirstLetter,
		getFirstName,
	),
);

console.log(getInitial2(Maybe('Luca Medina')).val);
