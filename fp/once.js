const once = fn => {
	let done = false;

	return (...args) => {
		return done ? void 0 : ((done = true), fn(...args));
	};
};

const tellMeYourName = once(name => `My name is ${name}`);

console.log(tellMeYourName('Luca'));
console.log(tellMeYourName('Bianca'));
console.log(tellMeYourName('Philippe'));
