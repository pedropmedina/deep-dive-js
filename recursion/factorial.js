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
