class Node {
	constructor(data = null, next = null) {
		this.data = data;
		this.next = next;
	}

	toString(callback) {
		return callback ? callback(this.data) : `${this.data}`;
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

		if (!this.tail) this.tail = newNode;

		this.head = newNode;

		return this;
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

	deleteHead() {
		if (!this.head) return null;

		const deletedHead = this.head;

		this.head = this.head.next;

		if (!this.head) {
			this.head = null;
			this.tail = null;
		}

		return deletedHead;
	}

	toArray() {
		if (!this.head) return null;

		const array = [];

		let currentNode = this.head;

		while (currentNode) {
			array.push(currentNode);
			currentNode = currentNode.next;
		}

		return array;
	}

	fromArray(array) {
		array.forEach(element => this.append(element));
		return this;
	}

	toString(callback) {
		return this.toArray()
			.map(node => node.toString(callback))
			.toString();
	}
}

class Stack {
	constructor() {
		this.list = new List();
	}

	push(data) {
		return data ? this.list.prepend(data) : null;
	}

	pop() {
		return this.list.deleteHead();
	}

	isEmpty() {
		return !this.list.head;
	}

	peak() {
		if (this.isEmpty()) return null;

		return this.list.head.data;
	}
}

// testing list isolated
const list = new List();
list.prepend('Bianca');
list.prepend('Luca');
list.prepend('Philippe');

list.deleteHead();

console.log(list.toArray());
console.log(list.fromArray(['Anne', 'Jane']));
console.log(list.toString(data => data));

console.log(list.head);
console.log(list.tail);

// testing stack
const stack = new Stack();

stack.push('Goya');
stack.push('Delacroix');
stack.push('Da Vinci');

stack.pop();

console.log(stack.isEmpty());

console.log(stack.peak());

console.log(stack.list.head);
console.log(stack.list.tail);
