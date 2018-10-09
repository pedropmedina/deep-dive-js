function basicRecursion(max, current) {
	if (current > max) return; // base case
	console.log(current);
	basicRecursion(max, current + 1);
}

basicRecursion(5, 1);

// -----------------------------------------------------------
/*
	fib(6)
	-> fib(5) + fib(4)
	-> fib(4) + fib(3) + fib(3) + fib(2)
	-> fib(3) + fib(2) + fib(2) + fib(1) + fib(2) + fib(1) + fib(2)
	-> fib(2) + fib(1) + fib(2) + fib(2) + fib(1) + fib(2) + fib(1) + fib(2)
	-> 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 === 8
*/
function fibonacci(n) {
	if (n <= 2) return 1;
	return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6));

for (let i = 1; i <= 20; i++) {
	console.log(`sequence: ${i} --- fibonacci: ${fibonacci(i)}`);
}

// -----------------------------------------------------------
/*
	factorial(3)
	1 - creates new local execution context
	2 - declares n parameter and assigns it value 3
	3 - check condition -> false
	4 - return factorial(2) * 3

	factorial(2)
	1 - creates new local execution context
	2 - declares n parameter and assigns it value 2
	3 - check condition -> false
	4 - return factorial(1) * 2

	factorial(1)
	1 - creates new local execution context
	2 - declares n parameter and assigns it value 1
	3 - check condition -> true
	4 - return 1

*/
function factorial(n) {
	if (n < 2) return 1;
	return factorial(n - 1) * n;
}

console.log(factorial(3));
