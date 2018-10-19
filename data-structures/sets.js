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

// returns a new set with unique elements from both sets.
// Start by creating a new set and adding to it the elements of
// set 1, then add to new set elements from set 2 that do not
// already exists in the new set. This is pretty much
// the default feature of sets
Set.prototype.union = function(otherSet) {
	let unionSet = new Set();

	let values = this.values();
	for (let i = 0; i < values.length; i++) {
		unionSet.add(values[i]);
	}

	values = otherSet.values();
	for (let i = 0; i < values.length; i++) {
		unionSet.add(values[i]);
	}

	return unionSet;
};

// given both sets, return a set with elements that exists in both sets
Set.prototype.intersection = function(otherSet) {
	const intersectionSet = new Set();

	const values = otherSet.values();
	for (let i = 0; i < values.length; i++) {
		if (this.has(values[i])) {
			intersectionSet.add(values[i]);
		}
	}
	return intersectionSet;
};

// given sets A and B, return set C with elements existing in A, and not in B
// difference could also be implemented to return a new set with elements
// existing in B, and not A, and elements exisiting in A and not B
Set.prototype.difference = function(otherSet) {
	const differenceSet = new Set();

	let values = this.values();
	for (let i = 0; i < values.length; i++) {
		if (!otherSet.has(values[i])) {
			differenceSet.add(values[i]);
		}
	}

	return differenceSet;
};

// given two sets A and B, return true if A is subset of B, meaning
// for every element in A, it must also exist in B. Important thing
// to consider here is the size of A. As a subset of B, A's size
// must be lesser or the same as B's size to qualify as a subset as
// all elements in A must also exist in B
Set.prototype.subset = function(otherSet) {
	const values = this.values();

	if (otherSet.size() < values.length) {
		return false;
	} else {
		for (let i = 0; i < values.length; i++) {
			if (!otherSet.has(values[i])) return false;
		}
		return true;
	}
};

// testing set
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

// testing union
const set1 = new Set();
set1.add(1);
set1.add(2);
set1.add(3);

const set2 = new Set();
set2.add(2);
set2.add(3);
set2.add(5);

const unionSet = set1.union(set2);
console.log(unionSet);

// testing intersection
const set3 = new Set();
set3.add(1);
set3.add(2);
set3.add(3);
set3.add(6);
set3.add(7);
set3.add(4);
set3.add(5);

const set4 = new Set();
set4.add(2);
set4.add(3);
set4.add(5);
set4.add(4);

const intersection = set3.intersection(set4);
console.log(intersection);

// testing difference set
const set5 = new Set();
set5.add(1);
set5.add(2);
set5.add(3);
set5.add(7);

const set6 = new Set();
set6.add(1);
set6.add(3);
set6.add(34);
set6.add(320);
set6.add(2);
set6.add(5);

const difference = set5.difference(set6);
console.log(difference);

// testing subsets
const set7 = new Set();
set7.add(1);
set7.add(2);
set7.add(3);

const set8 = new Set();
set8.add(2);
set8.add(3);
set8.add(1);
set8.add(5);

const subset = set7.subset(set8);
console.log(subset);
