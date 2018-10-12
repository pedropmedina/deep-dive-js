class Node {
	constructor(data, next = null) {
		this.data = data;
		this.next = next;
	}

	toString(callback) {
		return callback ? callback(this.data) : `${this.data}`;
	}
}

class LinkList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	prepend(data) {
		const newNode = new Node(data, this.head);

		this.head = newNode;

		// This only takes place the first time the list is created
		if (!this.tail) {
			this.tail = newNode;
		}

		return this;
	}

	append(data) {
		const newNode = new Node(data);
		// if !head, start over by assigning node to both head and tail
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;

			return this;
		}

		// Tail keeps a point reference to the latest node in list.
		// We use it to reference that node and add a newest one next to it,
		// then we reassign tail to the newest appended node
		this.tail.next = newNode;
		this.tail = newNode;

		return this;
	}

	delete(data) {
		if (!this.head) {
			return null;
		}

		let deletedNode = null;

		// handle deletion of head
		if (this.head && this.head.data === data) {
			deletedNode = this.head;
			this.head = this.head.next;
		}

		let currentNode = this.head;

		// handing deletion of nodes between head and tail
		if (currentNode !== null) {
			while (currentNode.next) {
				if (currentNode.next.data === data) {
					deletedNode = currentNode.next;
					currentNode.next = deletedNode.next;
				} else {
					currentNode = currentNode.next;
				}
			}
		}

		// handle tail to reference the last object now in the list
		if (this.tail.data == data) {
			this.tail = currentNode;
		}

		return deletedNode;
	}

	find({ data = undefined, callback = undefined }) {
		if (!this.head) {
			return null;
		}

		let currentNode = this.head;

		// the user is given the option to use a callback returns a boolean,
		// allowing user to evaluate node's data with different set of conditions
		while (currentNode) {
			if (callback && callback(currentNode.data)) {
				return currentNode;
			}

			if (data && currentNode.data === data) {
				return currentNode;
			}

			currentNode = currentNode.next;
		}
		return null;
	}

	deleteTail() {
		const deletedTail = this.tail;

		// In the event there's only one node in list
		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;

			return deletedTail;
		}

		let currentNode = this.head;

		while (currentNode.next) {
			if (!currentNode.next.next) {
				currentNode.next = null;
			} else {
				currentNode = currentNode.next;
			}
		}

		// update tail to last node in list
		this.tail = currentNode;

		return deletedTail;
	}

	deleteHead() {
		if (!this.head) {
			return null;
		}

		const deletedHead = this.head;

		if (this.head.next) {
			this.head = this.head.next;
		} else {
			this.head = null;
			this.tail = null;
		}

		return deletedHead;
	}

	fromArray(dataArr) {
		dataArr.forEach(data => this.append(data));

		return this;
	}

	toArray() {
		const nodes = [];

		let currentNode = this.head;

		while (currentNode) {
			nodes.push(currentNode);
			currentNode = currentNode.next;
		}

		return nodes;
	}
}

const linkedList = new LinkList();
linkedList.prepend('Pedro');
// linkedList.prepend('Bianca');
// linkedList.prepend('Luca');

linkedList.append('Philippe');
linkedList.append('Sergio');

// linkedList.delete('Sergio');

const foundNode = linkedList.find({ data: 'Philippe' });

linkedList.fromArray(['Ann', 'Jane']);

const nodesArr = linkedList.toArray();

console.log(linkedList.head);

console.log(linkedList.tail);

console.log(foundNode);

console.log(nodesArr);
