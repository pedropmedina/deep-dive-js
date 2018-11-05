const mapWith = (fn, [first, ...rest]) =>
	first === undefined ? [] : [fn(first), ...mapWith(fn, rest)];

const addBy2 = x => x + 2;

const r = mapWith(addBy2, [1, 2, 3, 4, 5]);

console.log(r);
