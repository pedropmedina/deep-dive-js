const leftVariadic = fn => {
	if (fn.length < 1) {
		return fn;
	} else {
		return (...args) => {
			const gathered = args.slice(0, args.length - fn.length + 1),
				restArgs = args.slice(args.length - fn.length + 1);

			return fn(gathered, ...restArgs);
		};
	}
};

const butLastAndLast = leftVariadic((butLast, last) => [butLast, last]);

const r = butLastAndLast('hello', 'there', 'from', 'here.');

console.log(r);
