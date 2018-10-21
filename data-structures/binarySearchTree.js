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

// base case here is when we've reached the last node in the tree (null)
function inOrderTraverseNode(node, callback) {
	if (node) {
		inOrderTraverseNode(node.left, callback);
		callback(node.key);
		inOrderTraverseNode(node.right, callback);
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

BinarySearchTree.prototype.search = function(key) {};

BinarySearchTree.prototype.inOrderTraverse = function(callback) {
	inOrderTraverseNode(this.root, callback);
};

BinarySearchTree.prototype.preOrderTraverse = function() {};
BinarySearchTree.prototype.postOrderTraverse = function() {};
BinarySearchTree.prototype.min = function() {};
BinarySearchTree.prototype.max = function() {};
BinarySearchTree.prototype.remove = function(key) {};

const bst = new BinarySearchTree();
bst.insert(8);
bst.insert(6);
bst.insert(9);
bst.insert(15);
bst.insert(10);

bst.inOrderTraverse(key => console.log(key));

console.log(bst.root);
