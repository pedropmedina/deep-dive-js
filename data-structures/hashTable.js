class Node {
	constructor(data = null, next = null) {
		this.data = data;
		this.next = next;
	}
}

class LinkedList {
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

		return (this.head = newNode);
	}

	append(data) {
		if (!data) return null;

		const newNode = new Node(data);

		if (!this.tail) {
			this.head = newNode;
			this.tail = newNode;
			return this;
		}

		this.tail.next = newNode;
		this.tail = newNode;

		return this;
	}

	find({ data, callback }) {
		if (!this.head) return null;

		let currentNode = this.head;

		while (currentNode) {
			if (callback && callback(currentNode.data)) return currentNode;

			if (data && data.name === currentNode.data.name) return currentNode;

			currentNode = currentNode.next;
		}
		return null;
	}

	delete(data) {
		if (!data) return null;

		if (!this.head) return null;

		let deletedNode;

		if (data.name === this.head.data.name) {
			deletedNode = this.head;

			if (this.head === this.tail) {
				this.head = null;
				this.tail = null;

				return deletedNode;
			} else {
				this.head = deletedNode.next;

				return deletedNode;
			}
		}

		let currentNode = this.head;

		while (currentNode.next) {
			if (currentNode.next.data.name === data.name) {
				deletedNode = currentNode.next;
				currentNode.next = currentNode.next.next;

				if (deletedNode === this.tail) {
					this.tail = currentNode;
				}

				return deletedNode;
			}
			currentNode = currentNode.next;
		}
		return null;
	}
}

// give table a default size
const defaultSize = 20;

class HashTable {
	constructor() {
		this.buckets = Array(defaultSize)
			.fill(null)
			.map(() => new LinkedList());
		this.keys = {};
	}

	hash(key) {
		// sum of charCodeAt % array's length
		const hash = Array.from(key).reduce((acc, next) => {
			return acc + next.charCodeAt(0);
		}, 0);

		return hash % this.buckets.length;
	}

	set(key, data) {
		// hash key -> e.g. 3 (an integer) to be used as index for array
		const hashedKey = this.hash(key);
		// save hashed key in keys object under its key label for easy access
		this.keys[key] = hashedKey;
		// access linked list with hashed key (index)
		const linkedList = this.buckets[hashedKey];
		// attempt to find node in linked list
		const node = linkedList.find({ callback: data => data.key === key });

		if (!node) {
			linkedList.append({ key, ...data });
		} else {
			node.data = { key, ...data };
		}
	}

	delete(key) {
		const hashedKey = this.hash(key);
		delete this.keys[key];
		const linkedList = this.buckets[hashedKey];
		const node = linkedList.find({ callback: data => data.key === key });

		if (node) return linkedList.delete(node.data);

		return null;
	}

	get(key) {
		const linkedList = this.buckets[this.hash(key)];
		const node = linkedList.find({ callback: data => data.key === key });

		return node ? node.data : null;
	}

	has(key) {
		return Object.hasOwnProperty.call(this.keys, key);
	}

	getKeys() {
		return Object.keys(this.keys);
	}
}

// testing list in isolation
const list = new LinkedList();
list.append({ key: 0, name: 'Bianca' });
list.append({ key: 1, name: 'Luca' });
list.append({ key: 2, name: 'Philippe' });

list.delete({ name: 'Philippe' });

const foundWithData = list.find({ data: { name: 'Luca' } });
const foundWithCallback = list.find({ callback: data => data.name === 'Luca' });

console.log(foundWithData);
console.log(foundWithCallback);

console.log(list.head);
console.log(list.tail);

// testing hash table
const table = new HashTable();

table.set('Pedro', { name: 'Pedro' });
table.set('Bianca', { name: 'Bianca' });

table.delete('Bianca');

console.log(table.get('Pedro'));

console.log(table.has('Pedro'));
console.log(table.has('Bianca'));

console.log(table.getKeys());

console.log(table.buckets);
console.log(table.keys);
