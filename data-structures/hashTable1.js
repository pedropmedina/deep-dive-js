// hash table also known as the hash map
// In hash tables we do not need to remove the element from the
// the array. Doing so will shift the other elements from their
// original position and the next time we try to get an element with
// the hash function it'll get the wrong element as they were shift from
// position. This is why we simple assign it undefined to the
// index where the element was removed from

// --------------------------------------------------------------- Node
function Node(key = null, value = null, next = null) {
	this.key = key;
	this.value = value;
	this.next = next;
}

Node.prototype.toString = function(position) {
	return `[${this.key} (${position}) - ${this.value}]`;
};

// --------------------------------------------------------------- Linked List
function LinkedList() {
	this.head = null;
	this.tail = null;
}

LinkedList.prototype.append = function(node) {
	if (!this.head) {
		this.head = node;
		this.tail = node;
	} else {
		this.tail.next = node;
		this.tail = node;
	}
	return this;
};

LinkedList.prototype.find = function(key) {
	if (!this.head) return null;

	let current = this.head;

	if (this.tail.key === key) return this.tail;

	while (current) {
		if (current.key === key) return current;
		current = current.next;
	}
	return null;
};

LinkedList.prototype.delete = function(key) {
	if (!this.head) return null;

	let current = this.head;

	if (current.key === key) {
		this.head = current.next;

		if (this.tail === current) {
			this.tail = null;
		}

		return current;
	} else {
		let deleted;

		while (current.next) {
			if (current.next.key === key) {
				deleted = current.next;
				current.next = current.next.next;

				if (deleted === this.tail) {
					this.tail = current;
				}

				return deleted;
			}
			current = current.next;
		}
	}
};

// --------------------------------------------------------------- Hash Table
function HashTable() {
	this.table = [];
}

HashTable.prototype.loseloseHashCode = function(key) {
	let hash = 0;
	for (let i = 0; i < key.length; i++) {
		hash += key.charCodeAt(i);
	}
	return hash % 37;
};

HashTable.prototype.put = function(key, value) {
	const position = this.loseloseHashCode(key);
	if (!this.table[position]) {
		this.table[position] = new LinkedList();
	}
	const node = new Node(key, value);
	console.log(node.toString(position));
	this.table[position].append(node);
};

HashTable.prototype.get = function(key) {
	const list = this.table[this.loseloseHashCode(key)];
	if (!list) return undefined;
	return list.find(key);
};

HashTable.prototype.remove = function(key) {
	const list = this.table[this.loseloseHashCode(key)];
	return list.delete(key);
};

// testing the hash table
const table = new HashTable();

table.put('bianca', 'bianca');
table.put('Luca', 'Luca');
table.put('Philippe', 'Philippe');
table.put('Tyrion', 'Tyrion');
table.put('Aaron', 'Aaron');

const deleted = table.remove('Aaron');
console.log(deleted);

const gotten = table.get('Philippe');
console.log(gotten);

console.log(table.table[16]);
