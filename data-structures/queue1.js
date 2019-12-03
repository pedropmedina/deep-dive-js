const util = require('util');

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    return this.first;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (!this.length) {
      this.first = newNode;
      this.last = newNode;
      this.length++;
      return this;
    }

    this.last.next = newNode;
    this.last = newNode;
    this.length++;
    return this;
  }

  dequeue() {
    if (!this.length) {
      return null;
    }

    if (this.first === this.last) {
      this.last = null;
    }

    const holdingPointer = this.first.next;
    this.first = holdingPointer;
    this.length--;
    return this;
  }
}

const queue = new Queue();

queue.enqueue('Jane');
queue.enqueue('John');
queue.enqueue('Ana');

queue.dequeue();
queue.dequeue();
queue.dequeue();

console.log(
  util.inspect(queue, { showHidden: false, depth: null, colors: true })
);
