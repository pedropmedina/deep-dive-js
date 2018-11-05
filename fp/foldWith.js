const foldWith = (fn, terminalValue, [first, ...rest]) =>
	first === undefined
		? terminalValue
		: fn(first, foldWith(fn, terminalValue, rest));

const sumAll = (num, acc) => num * num + acc;

const r = foldWith(sumAll, 0, [1, 2, 3, 4, 5]);

console.log(r);
