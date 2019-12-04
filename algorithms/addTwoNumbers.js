// given two non empty linked list, add each value on each linked list
// and carry tens over the next addition
// e.g. (2 -> 4 -> 3) + ( 5 -> 6 -> 4) = ( 7 -> 0 -> 8 )
// 2 -> 4 -> 3
// +    +    +
// 5 -> 6 -> 4
// -----------
// 7 -> 0 (c1) -> 1 + 7 (8)
// the output must be a linked list

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    this.length++;
    return this;
  }

  fromArray(arr) {
    if (!arr.length) {
      return this;
    }

    arr.forEach(value => this.append(value));
    return this;
  }

  toArray() {
    const values = [];
    let currentNode = this.head;

    while (currentNode) {
      values.push(currentNode.val);
      currentNode = currentNode.next;
    }
    return values;
  }
}

const addTwoNumbers = (l1, l2) => {
  const list = new LinkedList();
  let carry = null;
  let l1Current = l1.head;
  let l2Current = l2.head;

  while (l1Current && l2Current) {
    // start sum of values starting at the head of each list
    let sum = carry
      ? l1Current.val + l2Current.val + carry
      : l1Current.val + l2Current.val;

    // reset carry
    carry = null;

    // check if the sum is beyod ones to carry over
    if (sum > 9) {
      carry = parseInt(sum / 10);
      sum = parseInt(sum.toString().split('')[1]);
    }

    // create new node and assign it to the new linked list
    if (l1Current === l1.tail && l2Current === l2.tail && carry) {
      list.fromArray([sum, carry]);
    } else {
      list.append(sum);
    }

    // reassign current nodes
    l1Current = l1Current.next;
    l2Current = l2Current.next;
  }

  return list;
};

const list1 = new LinkedList();
const list2 = new LinkedList();
const list3 = new LinkedList();
const list4 = new LinkedList();

list1.fromArray([2, 4, 3]);
list2.fromArray([5, 6, 4]);

// sum = [1, 1, 0, 1]
list3.fromArray([4, 3, 7]);
list4.fromArray([7, 7, 2]);

console.log(addTwoNumbers(list1, list2).toArray());
console.log(addTwoNumbers(list3, list4).toArray());
