// Partial applications is a technique for specializing
// a generalized function.
// Partial applications specialzes a function by passing
// some of the arguments ahead, and the rest of the
// arguments later in the application
// By passing arguments ahead of times, we are specializing
// the function as we now know that the arguments to be
// passed later on will operate with the argumentes passed
// ahead of time.
// In the example below, addTo10 takes the arguments
// fn and 10 ahead of time, thus any other argumet
// passed in the future will operate on 10, hence its
// name.
// This technique can make functions more readable
function partial(fn, ...firstArgs) {
	return function applied(...lastArgs) {
		return fn(...firstArgs, ...lastArgs);
	};
}

function add(x, y) {
	return x + y;
}

const addTo10 = partial(add, 10);
console.log(addTo10(33)); // 43
