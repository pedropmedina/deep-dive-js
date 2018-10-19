// Sets -> sequencial data structure with unique values. (No values can repeat)
// Since objects do not allow for same property names, they guarantee
// uniqueness, values with same key will overwrite the previous key
function Set() {
	this.items = {};
}

Set.prototype.add = function(value) {
	if (!this.has(value)) {
		this.items[value] = value;
		return true;
	}
	return false;
};

Set.prototype.delete = function(value) {
	if (this.has(value)) {
		delete this.items[value];
		return true;
	}
	return false;
};

Set.prototype.has = function(value) {
	return this.items.hasOwnProperty(value);
};

Set.prototype.clear = function() {
	this.items = {};
};

Set.prototype.size = function() {
	// option 1 (compatible with moders browsers)
	// return Object.keys(this.items).length;

	// option 2 (compatible with all browsers)
	let count = 0;
	for (let key in this.items) {
		if (this.has(key)) count++;
	}
	return count;
};

Set.prototype.length = function() {
	return this.size();
};

Set.prototype.values = function() {
	// option 1 (compatible with modern browsers)
	// return Object.values(this.items);

	// option 2 (compatible with all browsers)
	const values = [];
	for (let key in this.items) {
		if (this.has(key)) {
			values.push(this.items[key]);
		}
	}
	return values;
};

const set = new Set();

set.add(0);
set.add(1);
set.add(2);

// set.clear();

set.delete(0);

const size = set.size();

const values = set.values();

const length = set.length();

console.log(length);

console.log(size);

console.log(values);

console.log(set.items);
