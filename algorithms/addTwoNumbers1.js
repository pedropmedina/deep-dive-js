function ListNode(val) {
  this.val = val;
  this.next = null;
}

var addTwoNumbers = function(l1, l2) {
  let carry = 0;
  let list = null;
  let tail = null; // keeps reference to the last node

  while (l1 || l2) {
    // sum
    let sum = ((l1 || {}).val || 0) + ((l2 || {}).val || 0) + carry;

    // reset carry
    carry = 0;

    // check if sum gives tens
    if (sum > 9) {
      carry = 1;
      sum = sum - 10;
    }

    // instantiate new node
    const newNode = new ListNode(sum);

    // if first iteration, create assign newNode to list and make reference to list from tail
    // else assign new node to last existing node made possible by reference via tail
    if (!list) {
      list = newNode;
      tail = list;
    } else {
      tail.next = newNode;
      tail = tail.next; // update tail to the last node
    }

    // update l1 and l2 to the next node
    l1 = (l1 || {}).next;
    l2 = (l2 || {}).next;

    console.log(l1);
    console.log(l2);
  }

  // check for pending curry and added to list
  if (carry) {
    tail.next = new Node(carry);
  }

  return list;
};

const l1 = new ListNode(1);
l1.next = new ListNode(8);
// l1.next.next = new ListNode(3);

const l2 = new ListNode(0);
// l2.next = new ListNode(6);
// l2.next.next = new ListNode(4);

console.log(addTwoNumbers(l1, l2));
