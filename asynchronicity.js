/**
 * 8 parts in javascript engine:
 * 1 - Global execution context
 * 2 - Thread of execution
 * 3 - Global Memory
 * 4 - Call Stack
 * 5 - Web browser features (Browser APIs)
 * 6 - Event Loop
 * 7 - Callback queue
 * 8 - MicroTask queue
 */

/**
 * Synchronous:
 *
 * 1 - declare function display in global memory
 * 	and assign it its function definition
 * 2 - declare constant dataFromAPI and assign fetchAndWait; this
 * 	will take some time to return, in the meanwhile,
 * 	the engine stops at that line until the data is returned.
 * 4 - called display with the data stored in const dataFromAPI
 * 		a - declare parameter data with value from dataFromAPI
 * 		b - console.log(data)
 * 		c - return undefined
 * 5 - popout call from stack
 * 6 - console.log(string)
 */
function display(data) {
	console.log(data);
}

const dataFromAPI = fetchAndWait('http://website.sample/data/1');

display(dataFromAPI);

console.log('Me last');

/**
 * Asynchronous:
 *
 * 1 - declare printHello function in memory and assign it its definition
 * 2 - spin up the browser timer api set to call printHello in 1000ms
 * 3 - log 'Hello' to the console
 * 4 - after 1000ms, setTimeout will push printHello to the call stack
 * 		a - printHello will create its local execution context with local memory
 * 		b - log 'Hello' to the console
 * 		c - return undefined
 *
 */
function printHello() {
	console.log('Hello');
}

setTimeout(printHello, 1000);

console.log('Me first');

/**
 * Rules for interacting with APIs outside of javascript;
 * 1 - declare function printHello in memory and assign it its definition
 * 2 - declare function blockFor1Sec in memory and assign it its definition
 * 3 - call blockFor1Sec causing a sort of lop that will repeat some
 * 		synchronous action for 1 second
 * 4 - log to the console 'Me first'
 * 5 - Once the call stack is empty and the thread of execution has gone
 * 				over all the synchronous code, printHello will be allow to be sent
 * 				to the  call stack. To ensure that the call stack is empty
 * 				javascript uses the event loop to the status of the call stack
 * 				and the callback queue to queue all functions in order to be
 * 				sent to the call stack. This is javascript rules for dealing
 * 				with APIs (Web browser features)
 */

function printHello() {
	console.log('hello');
}

function blockFor1Sec() {
	// blocks in the Javascript thread for 1 second
}

setTimeout(printHello, 0);

blockFor1Sec();

console.log('Me first');

/**
 * Bringing everything together in Asynchronicity:
 * 1 - declare function display in memory and assign it its definition
 * 2 - declare function printHello in memory and assign it its definition
 * 3 - declare function blockFor300ms in memory and assign it its defintion
 * 4 - spin up Timer feature in web browser APIs with printHello on 0ms
 * 		sending printHello to the callback queue
 * 5 - declare constant futureData in memory and assign it
 * 		the returned promise object from calling fetch('https://twitter.com/1')
 * 		where the 'value' property in the object is undefined at first
 * 6 - pass to 'onFulfillment' property array in Promise object via 'then'
 * 			the function definition 'display' to be triggered once value is set by					the response of xhr request.
 * 7 - Once the xhr response is received, we push to 'display' function
 * 			definition to the 'Microtask queue' (job queue) which handles modern
 * 			web browser's features such as 'fetch'. The event loop continues
 * 			to checek the call stack and prioritizes the Microtask queue over
 * 			the callback queue (task queue)
 * 7 - push to call stack 'blockFor300ms' which will ocupy the call stack
 * 			for 300ms with long loop
 * 8 - log to the console 'Me first'
 * 9 - after the event loop checks the stack and ensures that is empty
 * 		and the last line of synchronous code is executed, the engine
 * 		pushes 'display' function defintion from the Microtask queue
 * 		to the call stack
 * 10 - log to the console the tweet from passed to display
 * 11 - The event loop checks the call stack again and the Microtask queue
 * 12 - Upon ensuring these two are empty, it, finally pushes 'printHello'
 * 				function definition to the call stack
 * 13 - log to the console 'Hello'
 */
function display(data) {
	console.log(data);
}
function printHello() {
	console.log('Hello');
}
function blockFor300ms() {
	/* blocks js thread for 300ms with long loop */
}

setTimeout(printHello, 0);

const fuctureData = fetch('https://twitter.com/will/tweet/1');
fuctureData.then(display);

blockFor300ms();

console.log('Me first');
