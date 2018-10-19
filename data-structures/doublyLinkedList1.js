function Node(element = null, prev = null, next = null) {
	this.element = element;
	this.prev = prev;
	this.next = next;
}

function DoublyLinkedList() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}

DoublyLinkedList.prototype.insert = function(position, element) {
	if (position > -1 && position <= this.length) {
		let node = new Node(element),
			current = this.head,
			index = 0;

		if (position === 0) {
			if (!this.head) {
				this.head = node;
				this.tail = node;
			} else {
				node.next = this.head;
				node.prev = null;
				this.head = node;
			}
		} else if (position === this.length) {
			node.prev = this.tail;
			this.tail.next = node;
			this.tail = node;
		} else {
			while (index < position) {
				current = current.next;
				index++;
			}
			current.prev.next = node;
			node.prev = current.prev;
			node.next = current;
			current.prev = node;
		}

		this.length++;

		return this;
	} else {
		return null;
	}
};

DoublyLinkedList.prototype.removeAt = function(position) {
	if (position > -1 && position < this.length) {
		let current = this.head,
			deletedNode,
			index = 0;

		if (position === 0) {
			if (!this.head) return null;

			if (this.head === this.tail) {
				this.head = null;
				this.tail = null;
			} else {
				this.head = this.head.next;
				this.head.prev = null;
			}
		} else if (position === this.length - 1) {
			deletedNode = this.tail;

			this.tail = this.tail.prev;
			this.tail.next = null;
		} else {
			while (index < position) {
				current = current.next;
				index++;
			}

			deletedNode = current;
			current.prev.next = current.next;
			current.next.prev = current.prev;
		}

		this.length--;

		return deletedNode;
	} else {
		return null;
	}
};

DoublyLinkedList.prototype.indexOf = function(element) {
	let index = 0,
		current = this.head;

	while (index < this.length) {
		if (element === current.element) {
			return index;
		}

		current = current.next;
		index++;
	}
	return -1;
};

DoublyLinkedList.prototype.remove = function(element) {
	const index = this.indexOf(element);
	return this.removeAt(index);
};

const doublyList = new DoublyLinkedList();

doublyList.insert(0, 'Luca');
doublyList.insert(1, 'Bianca');
doublyList.insert(1, 'Pedro');

doublyList.removeAt(1);

const index = doublyList.indexOf('Bianca');

doublyList.remove('Bianca');

console.log(doublyList);
console.log(index);