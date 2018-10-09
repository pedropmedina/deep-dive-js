/**
 * 1 - declare async function createFlow in memory and assign it its defintion
 * 2 - invoke createFlow
 * 	a - create createFlow execution context
 * 	b - log to console 'Me first'
 * 	c - declare const data in local memory and assign to it the promise
 * 		object { value: undefined, onfulFillment: []} from calling
 * 		fetch('https://twitter.com/will/tweet/1')
 * 	d - start xhr request to provided address
 * 	e - await keyword will throw the engine away from the createFlow
 * 		execution context as it waits for the xhr response completion
 * 	f - on completion of the xhr request we update, value in the promise
 * 		object
 * 	g - log data to to console
 * 3 - log 'Me second' to console --> takes place before we logging data
 */
async function createFlow() {
	console.log('Me first');
	const data = await fetch('https://twitter.com/will/tweet/1');
	console.log(data);
}

createFlow();

console.log('Me second');
