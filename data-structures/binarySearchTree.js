// ----------------------------------------------------------- Helpers
// The base case for this recursive function is when the node.left
// or node.right is null. In that case the recursion will stop
// and the newNode will be assigned to either the left or right of the node
function insertNode(node, newNode) {
	if (newNode.key < node.key) {
		if (!node.left) {
			node.left = newNode;
		} else {
			insertNode(node.left, newNode);
		}
	} else {
		if (!node.right) {
			node.right = newNode;
		} else {
			insertNode(node.right, newNode);
		}
	}
}

// base case here is when we've reached the last node in the tree (null).
// Once the last node to the left of the tree is reached, that node is
// returned, then we check the right side of that node, and on...
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

function minNode(node) {
	// if (node) {
	// 	while (node && node.left) {
	// 		node = node.left;
	// 	}
	// 	return node.key;
	// }
	// return null;

	// recursive solution
	if (node.left) {
		// here we have to return each function in order to make the returned
		// value of the innestmost function available on the outtermost function.
		// In doing so, the returned value gets passed up to the parent function
		// e.g. func1 => func2 => func3 => 2
		return minNode(node.left);
	}
	return node.key;
}

function maxNode(node) {
	// if (node) {
	// 	while (node && node.right) {
	// 		node = node.right;
	// 	}
	// 	return node.key;
	// }
	// return null;

	// recursive solution
	if (node.right) {
		return maxNode(node.right);
	}
	return node.key;
}

function searchNode(node, key) {
	if (!node) {
		return false;
	}

	if (key < node.key) {
		return searchNode(node.left, key);
	} else if (key > node.key) {
		return searchNode(node.right, key);
	} else {
		console.log(node.key);
		return true;
	}
}

// ----------------------------------------------------------- Node
function Node(key) {
	this.key = key;
	this.left = null;
	this.right = null;
}

// ----------------------------------------------------------- BST
function BinarySearchTree() {
	this.root = null;
}

BinarySearchTree.prototype.insert = function(key) {
	const newNode = new Node(key);

	if (!this.root) {
		this.root = newNode;
	} else {
		insertNode(this.root, newNode);
	}
};

BinarySearchTree.prototype.search = function(key) {
	return searchNode(this.root, key);
};

BinarySearchTree.prototype.inOrderTraverse = function(callback) {
	inOrderTraverseNode(this.root, callback);
};

BinarySearchTree.prototype.preOrderTraverse = function(callback) {
	preOrderTraverseNode(this.root, callback);
};

BinarySearchTree.prototype.postOrderTraverse = function(callback) {
	postOrderTraverseNode(this.root, callback);
};

BinarySearchTree.prototype.min = function() {
	return minNode(this.root);
};

BinarySearchTree.prototype.max = function() {
	return maxNode(this.root);
};

BinarySearchTree.prototype.remove = function(key) {};

const bst = new BinarySearchTree();
bst.insert(8);
bst.insert(6);
bst.insert(9);
bst.insert(15);
bst.insert(10);
bst.insert(2);
bst.insert(20);

bst.inOrderTraverse(key => console.log('in order', key));

bst.preOrderTraverse(key => console.log('pre', key));

bst.postOrderTraverse(key => console.log('post', key));

const min = bst.min();
console.log('min', min);

const max = bst.max();
console.log(max);

const found = bst.search(6);
console.log(found);

console.log(bst.root);
