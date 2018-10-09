function createFunction() {
	function nestedFunc() {
		return 'I am the nested function';
	}
	return nestedFunc;
}

var function1 = createFunction();
console.log(function1());

function createFunctionPrinter(input) {
	function print() {
		console.log(input);
	}
	return print;
}

var printSample = createFunctionPrinter('sample');
printSample();
var printHello = createFunctionPrinter('hello');
printHello();

function outer() {
	var counter = 0; // this variable is outside incrementCounter's scope
	function incrementCounter() {
		counter++;
		console.log('counter', counter);
	}
	return incrementCounter;
}

var willCounter = outer();
var jasCounter = outer();

willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();

function addByX(x) {
	function add(y) {
		return (x += y);
	}
	return add;
}

var addByTwo = addByX(2);
console.log(addByTwo(2));
console.log(addByTwo(1));
