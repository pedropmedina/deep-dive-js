// dictionaries just like sets store unique elements.
// The major difference between them is that, sets
// store elements as [key, key] e.g. {Bianca: 'Bianca', 1: 1},
// whereas, dictionaries store elements as [key, values]
// e.g. {Bianca: {name: 'Bianca', age: 33}}
// Dictionaries are also know as Maps
function Dictionary() {
	this.items = {};
}

Dictionary.prototype.set = function(key, value) {
	this.items[key] = value;
};

Dictionary.prototype.delete = function(key) {
	return this.has(key) ? delete this.items[key] && true : false;
};

Dictionary.prototype.has = function(key) {
	return this.items.hasOwnProperty(key);
};

Dictionary.prototype.get = function(key) {
	return this.has(key) ? this.items[key] : undefined;
};

Dictionary.prototype.clear = function() {
	this.items = {};
};

Dictionary.prototype.size = function() {
	let count = 0;
	for (let key in this.items) {
		if (this.has(key)) count++;
	}
	return count;
};

Dictionary.prototype.keys = function() {
	const keys = [];
	for (let key in this.items) {
		if (this.has(key)) keys.push(key);
	}
	return keys;
};

Dictionary.prototype.values = function() {
	const values = [];
	for (let key in this.items) {
		if (this.has(key)) values.push(this.items[key]);
	}
	return values;
};

// testing Dictionary
const dictionary = new Dictionary();

dictionary.set('Bianca', { name: 'Bianca', age: 33 });
dictionary.set('Luca', { name: 'Luca', age: 5 });
dictionary.set('Philippe', { name: 'Philippe', age: 7 });

const deleted = dictionary.delete('Bianca');
console.log(deleted);

const gotten = dictionary.get('Luca');
console.log(gotten);

const values = dictionary.values();
console.log(values);

const keys = dictionary.keys();
console.log(keys);

const count = dictionary.size();
console.log(count);

console.log(dictionary);
