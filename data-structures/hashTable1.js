// hash table also known as the hash map
// In hash tables we do not need to remove the element from the
// the array. Doing so will shift the other elements from their
// original position and the next time we try to get an element with
// the hash function it'll get the wrong element as they were shift from
// position. This is why we simple assign it undefined to the
// index where the element was removed from
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
	console.log(position + ' - ' + key);
	this.table[position] = value;
};

HashTable.prototype.get = function(key) {
	return this.table[this.loseloseHashCode(key)];
};

HashTable.prototype.remove = function(key) {
	this.table[this.loseloseHashCode(key)] = undefined;
};

// teting the hash table
const table = new HashTable();

table.put('bianca', 'bianca');
table.put('Luca', 'Luca');
table.put('Philippe', 'Philippe');

table.remove('bianca');

const gotten = table.get('Luca');
console.log(gotten);

console.log(table);
