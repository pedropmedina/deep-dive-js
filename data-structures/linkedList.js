/*
	methods:
		1 - prepend
		2 - append
		3 - insert
		4 - delete
		5 - deleteHead
		6 - deleteTail
		7 - find
		8 - indexOf
		9 - isEmpty
		10 - size
		11 - toArray
		12 - fromArray
		13 - toString
*/
class Node {
	constructor(value = null, next = null) {
		this.value = value;
		this.next = next;
	}

	toString(callback) {
		return callback ? callback(this.value) : `${this.value}`;
	}
}

class List {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	prepend(value) {
		if (!value) {
			return null;
		}

		const node = new Node(value, this.head);

		this.head = node;

		if (!this.tail) {
			this.tail = node;
		}

		this.length++;

		return this;
	}

	append(value) {
		if (!value) {
			return null;
		}

		const node = new Node(value);

		if (!this.tail) {
			this.head = node;
			this.tail = node;
			this.length++;

			return this;
		}

		this.tail.next = node;
		this.tail = node;
		this.length++;

		return this;
	}

	insert(value, index) {
		if (!value || index <= -1 || index >= this.length) {
			return null;
		}

		if (index === 0) {
			return this.prepend(value, this.head);
		}

		if (index === this.length - 1) {
			return this.append(value);
		}

		let node = new Node(value);
		let current = this.head;
		let previous = this.head;

		while (index) {
			previous = current;
			current = current.next;
			index--;
		}

		node.next = current;
		previous.next = node;
		return this;
	}

	delete(value) {
		if (!this.head) {
			return null;
		}

		if (value === this.head.value) {
			return this.deleteHead();
		}

		if (value === this.tail.value) {
			return this.deleteTail();
		}

		let current = this.head.next,
			previous = this.head,
			deleted;

		while (current) {
			if (current.value === value) {
				deleted = current;
				previous.next = current.next;
			}

			previous = current;
			current = current.next;
		}

		return deleted;
	}

	deleteHead() {
		if (!this.head) {
			return null;
		}

		const deleted = this.head;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;

			return deleted;
		}

		this.head = deleted.next;

		return deleted;
	}

	deleteTail() {
		if (!this.head) {
			return null;
		}

		let deleted = this.tail,
			current = this.head,
			previous;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;

			return deleted;
		}

		while (current) {
			if (current === this.tail) {
				previous.next = null;
				this.tail = previous;
			}

			previous = current;
			current = current.next;
		}

		return deleted;
	}

	find(value) {
		if (!this.head) {
			return null;
		}

		let current = this.head;

		while (current) {
			if (current.value === value) {
				return current;
			}
			current = current.next;
		}

		return null;
	}

	indexOf(value) {
		if (!value) {
			return -1;
		}

		// let current = this.head;
		// let index = 0;

		// while (current) {
		// 	if (current.value === value) {
		// 		return index;
		// 	}

		// 	current = current.next;
		// 	index++;
		// }
		// return -1;

		// recursive version
		const index = indexOfNode(this.head, value);

		return index !== 0 && !index ? -1 : index;
	}

	isEmpty() {
		return !this.length;
	}

	size() {
		return this.length;
	}

	toArray() {
		let current = this.head,
			array = [];

		while (current) {
			array.push(current);
			current = current.next;
		}

		return array;
	}

	fromArray(array) {
		array.forEach(each => this.append(each));
		return this;
	}

	toString(callback) {
		return this.toArray().forEach(node => node.toString(callback));
	}
}

// ----------------------------------------------------- helpers
function indexOfNode(node, value) {
	if (!node) return;

	if (node.value === value) {
		return 0;
	} else {
		return indexOfNode(node.next, value) + 1;
	}
}

// ----------------------------------------------------- test
const list = new List();

list.prepend('bianca');
list.prepend('luca');

list.append('philippe');

const index = list.indexOf('luca');
console.log(index);

const size = list.size();
console.log(size);

const empty = list.isEmpty();
console.log(empty);

list.insert('pedro', 1);

list.deleteHead();

// list.deleteTail();

list.delete('philippe');

const found = list.find('bianca');
console.log(found);

const array = list.toArray();
console.log(array);

list.fromArray(['Lilia', 'Gricel']);

list.toString(x => console.log('hello', x));

console.log(list.head);
console.log(list.tail);
