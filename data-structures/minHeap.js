// heaps are represented in an array
// formulas:
// left child -> i * 2
// right child -> i * 2 + 1
// parent -> floor (i / 2)

// Min Heap
class MinHeap {
	constructor() {
		this.heap = [null];
	}

	insert(num) {
		// push to the end of the heap array
		this.heap.push(num);
		// check if there is more that the null element in heap array
		if (this.heap.length > 2) {
			// index becomes the last element added to the heap array
			let index = this.heap.length - 1;
			// enter a loop while current node is lesser than its parent with the
			// purpose of moving the lesser nodes to the highest level of the tree
			while (this.heap[index] < this.heap[Math.floor(index / 2)]) {
				// we don't want check element if index reaches 0 (null)
				if (index >= 1) {
					// swap values, the parent node takes the position in the array
					// of the child node and vice versa
					[this.heap[Math.floor(index / 2)], this.heap[index]] = [
						this.heap[index],
						this.heap[Math.floor(index / 2)],
					];
					if (Math.floor(index / 2) > 1) {
						index = Math.floor(index / 2);
					} else {
						break;
					}
				}
			}
		}
	}
}

const minHeap = new MinHeap();
minHeap.insert(6);
minHeap.insert(4);
minHeap.insert(2);
minHeap.insert(1);
minHeap.insert(8);

console.log(minHeap.heap);

console.log(1 < null);
console.log(1 / 2);
console.log(2 / 1);
