// The advantages of linked lists over arrays is that when removing
// elements we do not need to shif the values, just update the link,
// whereas in arrays, every time an element is removed the elements
// must be shift to accomodate their new indexes.
// When working with data that require lots of insertion and deletion
// linked lists are a better fit than arrays as they are O(1).
// Array are a better options when traversing data
function Node(element = null, next = null) {
	this.element = element;
	this.next = next;
}

function LinkedList() {
	this.length = 0;
	this.head = null;
	this.tail = null;
}

LinkedList.prototype.append = function(element) {
	const node = new Node(element);

	if (!this.head) {
		this.head = node;
		this.tail = node;
	} else {
		this.tail.next = node;
		this.tail = node;
	}

	this.length++;
};

LinkedList.prototype.removeAt = function(position) {
	if (position > -1 && position < this.length) {
		let current = this.head,
			previous,
			index = 0;

		if (position === 0) {
			this.head = current.next;
		} else {
			while (index < position) {
				previous = current;
				current = current.next;
				index++;
			}

			previous.next = current.next;
		}

		this.length--;

		// handle the tail in case last node is removed
		if (current === this.tail) {
			this.tail = previous;
		}

		return current.element;
	} else {
		return null;
	}
};

LinkedList.prototype.insert = function(position, element) {
	if (position > -1 && position <= this.length) {
		let current = this.head,
			previous,
			index = 0;

		if (position === 0) {
			let node = new Node(element, this.head);
			this.head = node;
			this.length++;
			return node.element;
		}

		while (index < position) {
			previous = current;
			current = current.next;
			index++;
		}
		let node = new Node(element, current);
		previous.next = node;

		if (previous === this.tail) {
			this.tail = node;
		}

		this.length++;
		return node.element;
	} else {
		return null;
	}
};

LinkedList.prototype.remove = function(element) {
	const index = this.indexOf(element);
	return this.removeAt(index);
};

LinkedList.prototype.indexOf = function(element) {
	let current = this.head,
		index = 0;

	while (current) {
		if (element === current.element) {
			return index;
		}
		index++;
		current = current.next;
	}
	return -1;
};

LinkedList.prototype.isEmpty = function() {
	return this.length === 0;
};

LinkedList.prototype.size = function() {
	return this.length;
};

LinkedList.prototype.toString = function() {
	let current = this.head,
		string = '';

	while (current) {
		string += current.element + (current.next ? '\n' : '');
		current = current.next;
	}

	return string;
};

const list = new LinkedList();
list.append('Bianca');
list.append('Pedro');
list.append('Luca');

const removed = list.removeAt(1);

list.insert(2, 'Pedro');

const string = list.toString();

const index = list.indexOf('Luca');

console.log(index);

console.log(list);
console.log(string);
