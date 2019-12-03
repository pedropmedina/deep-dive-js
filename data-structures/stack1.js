const util = require('util');

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  _append(value) {
    const newNode = new Node(value);

    if (!this.length) {
      this.top = newNode;
      this.bottom = newNode;
      this.length++;
      return this;
    }

    const holdingPointer = this.top;
    this.top = newNode;
    this.top.next = holdingPointer;
    this.length++;
    return this;
  }

  _removeTop() {
    if (!this.top) {
      return null;
    }

    if (this.top === this.bottom) {
      this.bottom = null;
    }

    const holdingPointer = this.top;
    this.top = holdingPointer.next;
    this.length--;
    return this;
  }

  peek() {
    return this.top;
  }

  push(value) {
    return value ? this._append(value) : null;
  }

  pop() {
    return this._removeTop();
  }
}

const stack = new Stack();

stack.push('Jane');
stack.push('John');
stack.push('Anna');

// stack.pop();
// stack.pop();
// stack.pop();

// console.log(
//   util.inspect(stack, { showHidden: false, depth: null, colors: true })
// );

console.log(stack.peek());
