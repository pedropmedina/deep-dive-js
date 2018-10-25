/*
	methods:
		1 - has
		2 - size
		3 - add
		4 - delete
		5 - values
		6 - clear
		7 - union
		8 - intersection
		9 - difference
		10 - subset
*/

class Set {
	constructor() {
		this.items = {};
		this.length = 0;
	}

	has(item) {
		return this.items.hasOwnProperty(item);
	}

	size() {
		return this.length;
	}

	add(item) {
		if (!this.has(item)) {
			this.items[item] = item;
			this.length++;
			return this.items;
		}
		return null;
	}

	delete(item) {
		if (this.has(item)) {
			delete this.items[item];
			this.length--;
			return true;
		}
		return false;
	}

	values() {
		// return Object.values(this.items);

		const values = [];
		for (let i in this.items) {
			values.push(this.items[i]);
		}
		return values;
	}

	clear() {
		this.items = {};
		this.length = 0;
		return this.items;
	}

	union(otherSet) {
		const unionSet = new Set();

		let values = this.values();
		for (let i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}

		values = otherSet.values();
		for (let i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}

		return unionSet;
	}

	intersection(otherSet) {
		const intersectionSet = new Set();

		for (let i in this.items) {
			if (otherSet.has(this.items[i])) {
				intersectionSet.add(this.items[i]);
			}
		}

		return intersectionSet;
	}

	difference(otherSet) {
		const differenceSet = new Set();

		for (let i in this.items) {
			if (!otherSet.has(this.items[i])) {
				differenceSet.add(this.items[i]);
			}
		}

		return differenceSet;
	}

	subset(otherSet) {
		if (this.size() > otherSet.size()) {
			return false;
		}

		for (let i in this.items) {
			if (!otherSet.has(this.items[i])) {
				return false;
			}
		}
		return true;
	}
}

// --------------------------------------------------- test
const set1 = new Set();
set1.add('bianca');
set1.add('luca');
set1.add('philippe');

// console.log(set.has('bianca'));

// set.delete('philippe');

// set.clear();

// console.log(set.size());

// console.log(set.values());

// console.log(set);

const set2 = new Set();
set2.add('bianca');
set2.add('pedro');
set2.add('philippe');

const union = set1.union(set2);
console.log(union.items);

const intersection = set1.intersection(set2);
console.log(intersection);

const difference = set1.difference(set2);
console.log(difference);

const subset = set1.subset(set2);
console.log(subset);
