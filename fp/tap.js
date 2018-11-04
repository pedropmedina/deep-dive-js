// tap is a combinator

// Combinators are higher order functions that use only function applications
// to define a result from its arguments.

// Combinator I (identity combinator) is represented as (x) => x
// Combinator K (this is what tap goes under) (x) => (y) => x

// One of the application of tap is that it allows for value to be used on
// debugging and side effects while conserving the value

const tap = value => fn => (typeof fn === 'function' && fn(value), value);

const r = tap('Luca')(value => console.log(`${value} is a great student.`));
console.log('r:', r);

// turning it off
const r1 = tap('Luca')();
console.log('r1:', r1);

// currying tap
const tap1 = (value, fn) => {
	const curried = fn => (typeof fn === 'function' && fn(value), value);

	return fn === undefined ? curried : curried(fn);
};

const r2 = tap1('Luca', value => console.log(`${value} is a great student.`));
console.log('r2:', r2);

const r3 = tap1('Luca')(value => console.log(`${value} is a great student.`));
console.log('r3', r3);
