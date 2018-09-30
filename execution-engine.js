/**
 * What happens when javascript engine run the code?
 * 	1 - It'll create a global execution context
 * 	2 - The thread of execution, engine goes line by line,
 * 		top to bottom, left to right (parsing and executing)
 * 		threading its way down.
 * 	3 - It'll create a live memory where it'll store the
 * 		data in variables
 */

// Declare num in memory and assign it value 3
const num = 3;

// declare function multiplyBy2 in memory and assign it its function definition.
// NOTE: The code inside the scope of the function isn't declared until
// the function is executed
function multiplyBy2(inputNumber) {
	const result = inputNumber * 2;
	return result;
}

// declare name in memory and assign it string Pedro
const name = 'Pedro';

/**
 * The engine declares a constant output in memory with value undefined
 * as the its value is the return value of executing multiplyBy2(4)
 * 		Then the engine goes into the global execution context and
 * 		attempts to execute multiplyBy2(4).
 * 			The engine moves into the local execution context of multiplyBy2
 * 			and just as it does in the global execution context, it
 * 			execute line by line inside the function's local execution ctx
 * 			while creating a live memory just for the function
 * 			to save data from variables within itself. Once the function
 * 			finishes executing everything in memory will be automatically
 * 			garbage collected unless ** returned **, hence, the creation
 * 			of closures.
 * 			--------------------------------------------------------------
 * 			Steps followed inside multiplyBy2(4):
 * 				1 - declare parameter inputNumber in local memory
 * 						and assign it argument 4
 * 				2 - declare result variable in local memory and
 * 						assign it inputNumber * 2
 * 				3 - return the value of result 8 to the global execution context
 * 						and store it in output
 * 				4 - garbage collect everything in functions local memory, by result
 *
 */
const output = multiplyBy2(4);

/**
 *  1 - Out in the global execution context, declare newOutput constant
 * 			and assign it value undefined
 * 	2 - Attempt to execute multiplyBy2(10):
 * 		a - create a local execution context for the function
 * 		b - declare parameter inputNumber in local memory and assign
 * 				it argument 10
 * 		c - declare constant result and assign it value of expression 10 * 2
 * 		d - return 20 to the global execution context and assign it to
 * 				constant newOutput
 */
const newOutput = multiplyBy2(10);
