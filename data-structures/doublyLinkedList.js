class Node {
	constructor(data, next = null, previous = null) {
		this.data = data;
		this.next = next;
		this.previous = previous;
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
		const newNode = new Node(data, this.head);

		if (this.head) {
			this.head.previous = newNode;
		}

		this.head = newNode;

		if (!this.tail) {
			this.tail = newNode;
		}

		return this;
	}

	append(data) {
		const newNode = new Node(data);

		// in case head === null ( first time assignment)
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;

			return this;
		}

		this.tail.next = newNode;
		newNode.previous = this.tail;
		this.tail = newNode;

		return this;
	}

	delete(data) {
		if (!this.head || !data) {
			return null;
		}

		let deletedNode;

		// handle data === head.data
		if (data === this.head.data) {
			deletedNode = this.head;
			this.head = this.head.next;

			if (this.head) {
				this.head.previous = null;
			}

			return deletedNode;
		}

		let currentNode = this.head;

		while (currentNode) {
			if (currentNode.data === data) {
				deletedNode = currentNode;

				// Remember head and tail reference same object in memory. Tail is an
				// assistant to quickly delete last node in object. So when we use
				// tail update tail and assign null to tail.next, we are updating head
				// as well, as they both point to the to the same reference in memory
				if (this.tail === deletedNode) {
					this.tail = this.tail.previous;
					this.tail.next = null;
				} else {
					currentNode.next.previous = currentNode.previous;
					currentNode.previous.next = currentNode.next;
				}
			}
			currentNode = currentNode.next;
		}

		return deletedNode;
	}

	find(data) {
		if (!this.head || !data) {
			return null;
		}

		let currentNode = this.head;

		while (currentNode) {
			if (data === this.head.data) return this.head;
			if (data === this.tail.data) return this.tail;
			if (currentNode.data === data) return currentNode;
			currentNode = currentNode.next;
		}
	}

	deleteHead() {
		if (!this.head) {
			return null;
		}

		const deletedHead = this.head;

		if (this.head.next) {
			this.head = this.head.next;
			this.head.previous = null;
		} else {
			this.head = null;
			this.tail = null;
		}
		return deletedHead;
	}

	deleteTail() {
		if (!this.tail) {
			return null;
		}

		const deletedTail = this.tail;

		// in the case there's only one node in list
		if (this.tail === this.head) {
			this.tail = null;
			this.head = null;
		} else {
			this.tail = this.tail.previous;
			this.tail.next = null;
		}
		return deletedTail;
	}
}

const list = new List();

list.prepend('Bianca');
list.prepend('Luca');

list.append('Philippe');

// list.delete('Philippe');

const foundNode = list.find('Bianca');

console.log(list.head);
console.log(list.tail);

console.log(foundNode);
