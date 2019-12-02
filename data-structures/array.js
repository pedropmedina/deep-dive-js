class CustomArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  get(index) {
    return this.data[index];
  }

  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  delete(index) {
    const item = this.data[index];

    this.shiftItems(index);
  }

  shiftItems(index) {
    for (let i = index; i < this.length; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.pop(); // remove last item in object after shifting items
  }
}

const array1 = new CustomArray();

array1.push('hello there');
array1.push('hi');
array1.push('hi again!');
array1.push("what's up?");

// array1.pop();
array1.delete(2);

console.log(array1);
