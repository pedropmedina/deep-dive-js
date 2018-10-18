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
			prev,
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

		if (!this.tail) this.tail = node;

		return this;
	} else {
		return null;
	}
};

const doublyList = new DoublyLinkedList();

doublyList.insert(0, 'Luca');
doublyList.insert(1, 'Bianca');
doublyList.insert(1, 'Pedro');

console.log(doublyList.head);
