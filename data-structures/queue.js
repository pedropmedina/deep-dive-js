// rewrite LinkedList for practice purpose to be implemented in the
// queue as linked list share a lot of similarity. with the following
// functionalites found in linked list (append === enqueue, and deleteHead
// === dequeue) we can create a queue. In fact linked list, perform FIFO in O(1)
// making it a perfect candidate for the queue
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

	append(data) {
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

	deleteHead() {
		if (!this.head) return null;

		const deletedHead = this.head;

		// in the event there's only one node in list
		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			this.head = deletedHead.next;
		}
		return deletedHead;
	}
}

class Queue {
	constructor() {
		this.list = new List();
	}

	isEmpty() {
		return !this.list.head;
	}

	peak() {
		if (!this.list.head) {
			return null;
		}
		return this.list.head.data;
	}

	enqueue(data) {
		this.list.append(data);
	}

	dequeue() {
		const deletedHead = this.list.deleteHead();
		return deletedHead ? deletedHead : null;
	}
}

const queue = new Queue();

queue.enqueue('Bianca');
queue.enqueue('Luca');
queue.enqueue('Pedro');

queue.dequeue();

console.log(queue.list.head);
console.log(queue.list.tail);
