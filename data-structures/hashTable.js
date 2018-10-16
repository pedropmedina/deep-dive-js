function isEqual(obj1, obj2) {
	const keys1 = Object.keys(obj1).join(',');
	const keys2 = Object.keys(obj2).join(',');
	const values1 = Object.values(obj1).join(',');
	const values2 = Object.values(obj2).join(',');
	return keys1 === keys2 && values1 === values2;
}

class Node {
	constructor(data = null, next = null) {
		this.data = data;
		this.next = next;
	}
}

class List {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	prepend(data) {
		if (!data) return null;

		const newNode = new Node(data, this.head);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
			return this;
		}

		this.head = newNode;

		return this;
	}

	append(data) {
		if (!data) return null;

		const newNode = new Node(data);

		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
			return this;
		}

		this.tail.next = newNode;
		this.tail = newNode;
		return this;
	}

	delete(data) {
		if (!data) return null;

		let deletedNode = this.head;

		if (isEqual(data, deletedNode.data)) {
			this.head = deletedNode.next;

			if (!this.head) {
				this.tail = null;
			}

			return this;
		}

		let currentNode = this.head;

		while (currentNode.next) {
			if (isEqual(data, currentNode.next.data)) {
				deletedNode = currentNode.next;
				currentNode.next = deletedNode.next;

				if (deletedNode === this.tail) this.tail = currentNode;

				return deletedNode;
			} else {
				currentNode = currentNode.next;
			}
		}
		return null;
	}

	find({ data, callback }) {
		if (!this.head) return null;

		let currentNode = this.head;

		while (currentNode) {
			if (callback && callback(currentNode)) return currentNode;

			if (data && isEqual(currentNode.data, data)) return currentNode;

			currentNode = currentNode.next;
		}
		return null;
	}

	toArray() {
		if (!this.head) return null;

		const arr = [];
		let currentNode = this.head;

		while (currentNode) {
			arr.push(currentNode.data);
			currentNode = currentNode.next;
		}
		return arr;
	}

	fromArray(arr) {
		if (!arr) return null;
		arr.forEach(element => list.append(element));
		return this;
	}
}

const defaultSize = 20;

class HashTable {
	constructor() {
		this.buckets = Array(20)
			.fill(null)
			.map(bucket => new List());
		this.keys = {};
	}

	// hash function
	hash(key) {
		let hash;
		switch (typeof key) {
			case 'string':
				hash = Array.from(key).reduce(
					(acc, next) => acc + next.charCodeAt(0),
					0,
				);
				break;
			case 'number':
				hash = key;
				break;
		}
		return hash % this.buckets.length;
	}

	set(key, data) {
		// obtain an index to access bucket
		const index = this.hash(key);
		// add key : index to keys for easy access
		this.keys[key] = index;
		// access the linkedList in buckets under the created index
		const linkedList = this.buckets[index];
		// attempt to find an existing node with the same data
		const node = linkedList.find({
			callback: node => isEqual(node.data, data),
		});

		// TODO: fix case in which data alredy exist and we need to update
		if (!node) {
			linkedList.append(data);
		} else {
			node.data = { ...node.data, ...data };
		}
	}

	get(key, data) {
		const index = this.keys[key];
		const linkedList = this.buckets[index];
		const node = linkedList.find({
			callback: node => isEqual(node.data, data),
		});
		return node ? node : null;
	}

	delete(key, data) {
		const keyExist = this.keys.hasOwnProperty(key);

		if (keyExist) {
			const linkedList = this.buckets[key];
			const deletedNode = linkedList.delete(data);
			delete keys[key];
			return deletedNode;
		} else {
			return null;
		}
	}

	has(key) {
		return this.keys.hasOwnProperty(key);
	}

	getKeys() {
		return Object.keys(this.keys);
	}
}

const table = new HashTable();
table.set('Bianca', { name: 'Bianca', age: 33 });
console.log(table);

// ----------------------------------------------------
const list = new List();

list.prepend({ key: 'Pedro', name: 'Pedro', age: 29 });
list.prepend({ key: 'Bianca', name: 'Bianca', age: 33 });
list.append({ key: 'Luca', name: 'Luca', age: 5 });

list.delete({ key: 'Bianca', name: 'Bianca', age: 33 });
list.delete({ key: 'Luca', name: 'Luca', age: 5 });

// const found = list.find({data: { key: 'Pedro', name: 'Pedro', age: 29 }})
const found = list.find({ callback: node => node.data.key === 'Pedro' });

const arr = list.toArray();

const nodeArr = [
	{ key: 'Philippe', name: 'Philippe', age: 7 },
	{ key: 'Ana', name: 'Ana', age: 23 },
];
list.fromArray(nodeArr);

console.log(list.head);
console.log(list.tail);
console.log(found);
console.log(arr);
