/**
 * Implementing generator function from scratch:
 *
 * 1 - declare createFlow function in memory and assign it its definition
 * 2 - declare returnNextElement in memory and assign it the returned
 * 	value of createFlow
 * 		a - create new execution context
 * 		b - declare parameter array in local memory and assign it [4, 5, 6]
 * 		c - declare let i in local memory and assign it 0
 * 		d - declare const inner object in local memory
 * 		c - declare next property in inner object and assign function defintion
 * 		e - return inner object
 * 		f - pop function from call stack and garbage collect
 * 3 - declare const element in memory and assign it the returned value
 * 		of calling next method in returnNextElement
 * 		a - create new execution context
 * 		b - declare element in local memory and assign it array[i] (4) from
 * 			from the closed over parent lexical scope found in [[scope]]
 * 		c - increment i also found in the [[scope]] by 1
 * 		d - return 4
 * 		d - pop function from call stack
 * 		e - garbage collect that execution context
 * 4 - declare const element1 in memory and assign it returned value of
 * 		next under returnNextElement - follows the same steps as above
 *
 */
function createFlow(array) {
	let i = 0;
	const inner = {
		next: function() {
			const element = array[i];
			i++;
			return element;
		},
	};
	return inner;
}

const returnNextElement = createFlow([4, 5, 6]);
const element = returnNextElement.next();
const element1 = returnNextElement.next();

/**
 * generator function:
 *
 * 1 - declare functinon createFlow in memory and assign it its function
 * 	definition
 * 2 - declare function returnNextElement and assign to it the returned
 * 	value of calling createFlow which will return a generator obejct with the
 * 	next method on it
 * 3 - declare element in memory and assign it the return value of
 * 		returnNextElement.next
 * 	a - this will start the execution context for the createFlow generator
 * 	b - yield 4 and suspend (put on hold) the execution context
 * 	c - assign 4 to element in memory
 * 4 - repeat the step above ...
 */
function* createFlow() {
	yield 4;
	yield 5;
	yield 6;
}

const returnNextElement = createFlow();
const element = returnNextElement.next();
const element1 = returnNextElement.next();
const element2 = returnNextElement.next();
const element3 = returnNextElement.next();

console.log(element); // { value : 4, done: false }
console.log(element1); // { value : 5, done: false }
console.log(element2); // { value : 6, done: false }
console.log(element3); // { value : undefined, done: true }

/**
 * 1 - declare generator function createFlow in memory
 * 3 - declare returnNextElement in memory and assign it the
 * 	the call of createFlow which returns generator
 * 	object { next: function definition }
 * 4 - declare const element in memory and assign it the call to next in
 * 	returnNextFLow
 * 	b - starts execution context for createFlow
 * 	c - declare const num and assign it value 10
 * 	d - declare const newNum and assign it command yield 10 which will suspend
 * 		(put on hold) the execution context for createFlow. It's like calling
 * 		return in a function, therefore, 10 will never be assign to newNum
 * 		in local memory. newNum will remain undefined and element will
 * 		received 10 as value
 * 5 - declare const element1 and continue in the same execution context
 * 	started by the first call to next
 * 	a - newNum receives the value 2 passed down as argument to next. The
 * 	argument pass to next replaces the place of yield 10, as yield
 * 	cannot be assigned and the design of generators replaces it with the
 * 	following passed in argument
 * 	b - yield 5 + 2 as 2 is the value of newNum
 * 	c - suspend execution context
 * 	d - assign 7 to element1
 *
 */
function* createFlow() {
	const num = 10;
	const newNum = yield num;
	yield 5 + newNum;
	yield 6;
}

const returnNextElement = createFlow();
const element = returnNextElement.next(); // 10
const element1 = returnNextElement.next(2); // 7
const element2 = returnNextElement.next(); // 6
const element3 = returnNextElement.next(); // undefined

console.log(element);
console.log(element1);
console.log(element2);
console.log(element3);

/**
 * 1 - declare function doWhenDataReceived in memory and assign it its
 * 	function definition
 * 2 - declare function createFlow in memory and assign it its function
 * 	definition
 * 3 - declare const returnNextElement in memory and assign it the
 * 	return generator object from calling createFlow { next: function definition}
 * 4 - declare futureData in memory and assign it value from calling next
 * 	on returnNextElement
 * 	a - start new execution context for createFlow generator
 * 	b - declare data in local memory
 * 	c - yield promise object from calling fetch
 * 		{value: undefined, onfulFillment: function definition}
 * 	d - assign that promise object to futureData in memory
 * 	e - start xhr request on web browser API
 * 	f - suspend execution context for createFlow generator and keep data
 * 		as undefined for now
 * 5 - call then on promise object assigned to futureData
 * 	a - pass doWhenDataReceived to then
 * 	b - once value in promise value is updated, pass doWhenDataReceived to
 * 		the microtask queue with value received from xhr request
 * 	c - push doWhenDataReceived to the call stack
 * 		1 - create a new execution context
 * 		2 - declare parameter value in local memory and assign it data from
 * 			xhr request saved in value under the promise object
 * 		3 - call returnNextElement.next with value
 * 		4 - pop from call stack
 * 	d - assign to data in createFlow function generator
 * 	e - log that data to the console
 *
 */
function doWhenDataReceived(value) {
	returnNextElement.next(value);
}

function* createFlow() {
	const data = yield fetch('https://twitter.com/will/tweet/1');
	console.log(data);
}

const returnNextElement = createFlow();
const futureData = returnNextElement.next();

futureData.then(doWhenDataReceived);
