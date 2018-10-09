/**
 * 1 - declare numbers constant and assign it array of numbers
 * 2 - for loop will iterate over array and log to console each item
 */
const numbers = [4, 5, 6];

for (let i = 0; i < numbers.length; i++) {
	console.log(numbers[i]);
}

/**
 * 1 - declare function createFunction in memory and assign it its definition
 * 2 - declare returnNextElement in memory and assign it the return
 * 			value of calling createFunction with array [4, 5, 6], which
 * 			in this case is going to be a function definition of inner function
 * 				a - create a new execution context with local memory
 * 				b - declare array parameter and assign it array [4, 5, 6]
 * 				c - declare let i and assign it 0
 * 				d - declare function inner and assign its definition
 * 				e - return inner function definition along with a link to its
 * 					parent data [[scope]] and assign it to returnNextElement
 * 				f - garbage collect createFunction local execution context
 * 3 - declare element constant in memory and assign it value returned from
 * 			returnNextElement
 * 			a - create new execution context
 * 			b - declare const element in local memory with array[i], both datas
 * 				coming from bond live data [[scope]]
 * 			c - increment i++ in bond data [[scope]]
 * 			d - return element
 * 			e - pop function from call stack
 * 			f - garbage collect execution context
 * 4 - declare const element1 in memory and assign it value retuned from
 * 			returnNextElement
 * 			a - create new execution context
 * 			b - declare const element in local memory and assign it array[i]
 * 			c - return element to be assign to label element1 in global memory
 * 			d - pop function from call stack
 * 			e - garbage collect execution context
 */
function createFunction(array) {
	let i = 0;
	function inner() {
		const element = array[i];
		i++;
		return element;
	}
	return inner;
}

const returnNextElement = createFunction([4, 5, 6]);
const element = returnNextElement();
const element1 = returnNextElement();
