const maybe = fn => {
	return (...args) => {
		if (args.length === 0) {
			return;
		} else {
			for (let arg of args) {
				if (arg === null) return;
			}
			return fn(...args);
		}
	};
};

const sumArgs = maybe((a, b, c) => a + b + c);

const r = sumArgs(1, 2, 3);
console.log('r: ', r);

const r1 = sumArgs();
console.log('r1', r1);
