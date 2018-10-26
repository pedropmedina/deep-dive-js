/*
	methods:
		1 - insert
		2 - search
		3 - max
		4 - min
		5 - remove
		6 - inOrderTraverse
		7 - preOrderTraverse
		8 - postOrderTraverse
*/

class Node {
	constructor(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}

class BST {
	constructor() {
		this.root = null;
	}

	insert(key) {
		const newNode = new Node(key);

		if (!this.root) {
			this.root = newNode;
		} else {
			insertNode(this.root, newNode);
		}
	}

	search(key) {
		return searchNode(this.root, key);
	}

	max() {
		return maxNode(this.root);
	}

	min() {
		return minNode(this.root);
	}

	remove(key) {
		this.root = removeNode(this.root, key);
	}

	// depth first traversal
	inOrderTraverse(callback) {
		inOrderTraverseNode(this.root, callback);
	}

	preOrderTraverse(callback) {
		preOrderTraverseNode(this.root, callback);
	}

	postOrderTraverse(callback) {
		postOrderTraverseNode(this.root, callback);
	}

	// breadth first traversal
	breadthFirstTraverse() {
		return breadthFirstTraverseNode([this.root], []);
	}
}

// ---------------------------------------------------- helpers
function insertNode(node, newNode) {
	if (newNode.key < node.key) {
		if (!node.left) {
			node.left = newNode;
		} else {
			insertNode(node.left, newNode);
		}
	} else if (newNode.key > node.key) {
		if (!node.right) {
			node.right = newNode;
		} else {
			insertNode(node.right, newNode);
		}
	}
}

function searchNode(node, key) {
	if (!node) {
		return false;
	}

	if (key < node.key) {
		return searchNode(node.left, key);
	}

	if (key > node.key) {
		return searchNode(node.right, key);
	}

	return true;
}

function maxNode(node) {
	if (node.right) {
		return maxNode(node.right);
	}
	return node;
}

function minNode(node) {
	if (node.left) {
		return minNode(node.left);
	}
	return node;
}

function removeNode(node, key) {
	if (!node) {
		return null;
	}

	if (!key) {
		return node;
	}

	if (key < node.key) {
		node.left = removeNode(node.left, key);
		return node;
	} else if (key > node.key) {
		node.right = removeNode(node.right, key);
		return node;
	} else {
		if (!node.left && !node.right) {
			node = null;
			return node;
		}

		if (!node.left) {
			node = node.right;
			return node;
		}

		if (!node.right) {
			node = node.left;
			return node;
		}

		let aux = findMinNode(node.right);
		node.key = aux.key;
		node.right = removeNode(node.right, aux.key);
		return node;
	}
}

function findMinNode(node) {
	if (node.left) {
		findMinNode(node.left);
	}
	return node;
}

function inOrderTraverseNode(node, callback) {
	if (node) {
		inOrderTraverseNode(node.left, callback);
		callback(node.key);
		inOrderTraverseNode(node.right, callback);
	}
}

function preOrderTraverseNode(node, callback) {
	if (node) {
		callback(node.key);
		preOrderTraverseNode(node.left, callback);
		preOrderTraverseNode(node.right, callback);
	}
}

function postOrderTraverseNode(node, callback) {
	if (node) {
		postOrderTraverseNode(node.left, callback);
		postOrderTraverseNode(node.right, callback);
		callback(node.key);
	}
}

function breadthFirstTraverseNode(queue, array) {
	if (!queue || !queue.length) {
		return array;
	}

	while (queue.length) {
		const node = queue.shift();

		array.push(node.key);

		if (node.left) {
			queue.push(node.left);
		}

		if (node.right) {
			queue.push(node.right);
		}
	}

	return array;
}

// ---------------------------------------------------- test
const tree = new BST();

tree.insert(8);
tree.insert(10);
tree.insert(6);
tree.insert(4);
tree.insert(7);
tree.insert(12);

tree.inOrderTraverse(x => console.log('in-order: ', x));

tree.preOrderTraverse(x => console.log('pre-order: ', x));

tree.postOrderTraverse(x => console.log('post-order: ', x));

const found = tree.search(11);
console.log(found);

const max = tree.max();
console.log(max);

const min = tree.min();
console.log(min);

tree.remove(8);

const array = tree.breadthFirstTraverse();
console.log(array);

console.log(tree.root);
